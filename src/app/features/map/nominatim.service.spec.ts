import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { NominatimService } from './nominatim.service';

const endpoint = 'https://nominatim.openstreetmap.org/reverse';
const point = { lat: -15.7939, lon: -47.8828 };
const result = { display_name: 'Brasília, Distrito Federal, Brasil', lat: '-15.7939', lon: '-47.8828', address: { city: 'Brasília', country: 'Brasil' } };

describe('NominatimService', () => {
  let service: NominatimService;
  let http: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(NominatimService);
    http = TestBed.inject(HttpTestingController);
  });
  afterEach(() => { http.verify(); localStorage.clear(); vi.restoreAllMocks(); });

  async function configuredRequest(promise: Promise<unknown>) {
    http.expectOne('nominatim-config.json').flush({ endpoint });
    return vi.waitFor(() => http.expectOne(request => request.url === endpoint));
  }

  it('consulta com parâmetros explícitos e reaproveita o resultado sem nova requisição', async () => {
    const pending = service.reverse(point);
    const request = await configuredRequest(pending);
    expect(request.request.params.get('lat')).toBe('-15.793900');
    expect(request.request.params.get('lon')).toBe('-47.882800');
    expect(request.request.params.get('format')).toBe('jsonv2');
    expect(request.request.params.get('layer')).toBe('address');
    expect(request.request.params.get('zoom')).toBe('18');
    expect(request.request.params.get('accept-language')).toBe('pt-BR');
    request.flush(result);
    expect((await pending).fromCache).toBe(false);
    const cached = await service.reverse(point);
    expect(cached.fromCache).toBe(true);
    expect(cached.result).toEqual(result);
    http.expectNone(request => request.url === endpoint);
  });

  it('impede consultas simultâneas e respeita o intervalo mínimo', async () => {
    vi.spyOn(Date, 'now').mockReturnValue(100000);
    const pending = service.reverse(point);
    await expect(service.reverse(point)).rejects.toThrow('andamento');
    const request = await configuredRequest(pending);
    request.flush(result);
    await pending;
    await expect(service.reverse({ lat: -15, lon: -47 })).rejects.toThrow('Aguarde um instante');
    http.expectNone(request => request.url === endpoint);
  });

  it.each([404, 429, 403, 0, 500])('trata falha HTTP %s sem repetir automaticamente', async status => {
    const pending = service.reverse(point);
    const rejection = expect(pending).rejects.toThrow(status === 404 ? 'Nenhum endereço' : status === 429 ? 'Limite' : status === 403 ? 'Acesso recusado' : 'conexão');
    const request = await configuredRequest(pending);
    request.flush({}, { status, statusText: 'Falha' });
    await rejection;
  });

  it('trata ausência de endereço numa resposta HTTP 200', async () => {
    const pending = service.reverse(point);
    const rejection = expect(pending).rejects.toThrow('Nenhum endereço');
    const request = await configuredRequest(pending);
    request.flush({ error: 'Unable to geocode' });
    await rejection;
  });

  it('aceita outro provedor pela configuração em tempo de execução', async () => {
    const pending = service.reverse(point);
    http.expectOne('nominatim-config.json').flush({ endpoint: 'https://example.org/reverse' });
    const request = await vi.waitFor(() => http.expectOne(request => request.url === 'https://example.org/reverse'));
    request.flush(result);
    expect((await pending).result).toEqual(result);
  });

  it('recusa coordenadas inválidas antes de acessar a rede', async () => {
    await expect(service.reverse({ lat: 91, lon: 0 })).rejects.toThrow('Coordenadas inválidas');
    http.expectNone('nominatim-config.json');
  });
});
