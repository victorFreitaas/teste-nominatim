import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { ReversePanelComponent } from './reverse-panel.component';
import { NominatimService } from './nominatim.service';
import { ReverseLookup } from './nominatim.models';

const response: ReverseLookup = {
  fromCache: false, elapsedMs: 42,
  result: { display_name: 'Brasília, Brasil', lat: '-15.79', lon: '-47.88', address: { city: 'Brasília', country: 'Brasil' } },
};

describe('Painel de geocodificação reversa', () => {
  const reverse = vi.fn();
  beforeEach(async () => {
    reverse.mockReset();
    await TestBed.configureTestingModule({
      imports: [ReversePanelComponent], providers: [{ provide: NominatimService, useValue: { reverse } }],
    }).compileComponents();
  });

  it('aguarda seleção e botão; mostra endereço, campos ausentes e JSON', async () => {
    reverse.mockResolvedValue(response);
    const fixture = TestBed.createComponent(ReversePanelComponent);
    fixture.detectChanges();
    const page: HTMLElement = fixture.nativeElement;
    expect(page.querySelector('button')!.disabled).toBe(true);
    fixture.componentRef.setInput('point', { lat: -15.79, lon: -47.88 });
    fixture.detectChanges();
    expect(reverse).not.toHaveBeenCalled();
    page.querySelector('button')!.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(reverse).toHaveBeenCalledWith({ lat: -15.79, lon: -47.88 });
    expect(page.textContent).toContain('Brasília, Brasil');
    expect(page.textContent).toContain('Não informado');
    expect(page.querySelector('pre')?.textContent).toContain('display_name');
  });

  it('descarta resposta do ponto anterior após mudar a seleção', async () => {
    let resolve!: (value: ReverseLookup) => void;
    reverse.mockReturnValue(new Promise<ReverseLookup>(done => { resolve = done; }));
    const fixture = TestBed.createComponent(ReversePanelComponent);
    fixture.componentRef.setInput('point', { lat: -15.79, lon: -47.88 });
    fixture.detectChanges();
    const page: HTMLElement = fixture.nativeElement;
    page.querySelector('button')!.click();
    fixture.detectChanges();
    expect(page.querySelector('button')!.disabled).toBe(true);
    fixture.componentRef.setInput('point', { lat: -16, lon: -48 });
    fixture.detectChanges();
    resolve(response);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(page.querySelector('.result')).toBeNull();
    expect(page.textContent).toContain('-16.000000');
    expect(page.querySelector('button')!.disabled).toBe(false);
  });

  it('exibe falha e permite tentar novamente', async () => {
    reverse.mockRejectedValue(new Error('Limite do serviço atingido.'));
    const fixture = TestBed.createComponent(ReversePanelComponent);
    fixture.componentRef.setInput('point', { lat: -15, lon: -47 });
    fixture.detectChanges();
    const page: HTMLElement = fixture.nativeElement;
    page.querySelector('button')!.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(page.querySelector('[role="alert"]')?.textContent).toContain('Limite');
    expect(page.querySelector('button')!.disabled).toBe(false);
  });
});
