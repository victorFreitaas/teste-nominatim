import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, timeout } from 'rxjs';
import { Coordinates, ReverseLookup, ReverseResult } from './nominatim.models';

function isResult(value: unknown): value is ReverseResult {
  if (!value || typeof value !== 'object') return false;
  const data = value as Record<string, unknown>;
  return typeof data['display_name'] === 'string' && typeof data['lat'] === 'string'
    && typeof data['lon'] === 'string'
    && (data['address'] === undefined || (!!data['address'] && typeof data['address'] === 'object'
      && Object.values(data['address']).every(value => typeof value === 'string')));
}

@Injectable({ providedIn: 'root' })
export class NominatimService {
  private readonly http = inject(HttpClient);
  private endpoint?: Promise<string>;
  private busy = false;
  private nextRequestAt = 0;

  async reverse(point: Coordinates): Promise<ReverseLookup> {
    if (!Number.isFinite(point.lat) || !Number.isFinite(point.lon)
      || Math.abs(point.lat) > 90 || Math.abs(point.lon) > 180) {
      throw new Error('Coordenadas inválidas. Selecione outro ponto.');
    }
    if (this.busy) throw new Error('Aguarde a consulta em andamento.');
    this.busy = true;
    const started = performance.now();
    try {
      const endpoint = await this.getEndpoint();
      const params = {
        lat: point.lat.toFixed(6), lon: point.lon.toFixed(6),
        format: 'jsonv2', addressdetails: '1', 'accept-language': 'pt-BR',
        zoom: '18', layer: 'address',
      };
      const key = `nominatim:v1:${endpoint}:${new URLSearchParams(params)}`;
      const cached = this.readCache(key);
      if (cached) return { result: cached, fromCache: true, elapsedMs: Math.round(performance.now() - started) };
      if (Date.now() < this.nextRequestAt) {
        throw new Error('Aguarde um instante antes de consultar novamente.');
      }
      // Sem fila, repetição automática ou consultas em movimentos do mapa.
      this.nextRequestAt = Date.now() + 1100;
      const response = await firstValueFrom(this.http.get<unknown>(endpoint, { params }).pipe(timeout(15000)));
      if (response && typeof response === 'object' && 'error' in response) {
        throw new Error('Nenhum endereço encontrado para este ponto.');
      }
      if (!isResult(response)) throw new Error('O serviço retornou uma resposta inesperada.');
      try {
        localStorage.setItem(key, JSON.stringify({ expires: Date.now() + 86400000, result: response }));
      } catch { /* A consulta continua se o armazenamento estiver indisponível. */ }
      return { result: response, fromCache: false, elapsedMs: Math.round(performance.now() - started) };
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) throw new Error('Nenhum endereço encontrado para este ponto.');
        if (error.status === 429) throw new Error('Limite do serviço atingido. Aguarde antes de tentar novamente.');
        if (error.status === 403) throw new Error('Acesso recusado pelo serviço. Verifique a configuração e a política de uso.');
        throw new Error('Não foi possível consultar o serviço. Verifique a conexão e tente novamente.');
      }
      if (error instanceof Error && error.name === 'TimeoutError') {
        throw new Error('A consulta demorou demais. Tente novamente mais tarde.');
      }
      throw error;
    } finally {
      this.busy = false;
    }
  }

  private getEndpoint(): Promise<string> {
    if (!this.endpoint) {
      this.endpoint = firstValueFrom(this.http.get<{ endpoint: string }>('nominatim-config.json').pipe(timeout(10000)))
        .then(config => {
          const url = new URL(config.endpoint);
          if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Endpoint inválido.');
          return url.href;
        }).catch(() => {
          this.endpoint = undefined;
          throw new Error('Não foi possível carregar nominatim-config.json. Verifique a configuração do serviço.');
        });
    }
    return this.endpoint;
  }

  private readCache(key: string): ReverseResult | null {
    try {
      const value = JSON.parse(localStorage.getItem(key) ?? 'null');
      if (value && value.expires > Date.now() && isResult(value.result)) return value.result;
      localStorage.removeItem(key);
    } catch { /* Cache ausente ou inválido: consulta normal. */ }
    return null;
  }
}
