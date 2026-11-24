import { TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import * as L from 'leaflet';

describe('Mapa Leaflet', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [MapComponent] }).compileComponents();
  });

  it('inicia em Brasília com tiles HTTPS e atribuição visível', () => {
    const fixture = TestBed.createComponent(MapComponent);
    fixture.detectChanges();
    const map: HTMLElement = fixture.nativeElement;
    // Brasília (-15.7939, -47.8828) no zoom 12 corresponde ao tile 1503/2230.
    const tile = map.querySelector<HTMLImageElement>('img.leaflet-tile');
    expect(tile?.src).toBe('https://tile.openstreetmap.org/12/1503/2230.png');
    expect(map.querySelector('.leaflet-control-attribution')?.textContent).toContain('OpenStreetMap');
    expect(map.querySelector('.leaflet-control-attribution a[href="https://www.openstreetmap.org/copyright"]')).not.toBeNull();
    fixture.destroy();
  });

  it('permite ampliar e reduzir com os controles do mapa', () => {
    const fixture = TestBed.createComponent(MapComponent);
    fixture.detectChanges();
    const map: HTMLElement = fixture.nativeElement;
    map.querySelector<HTMLAnchorElement>('.leaflet-control-zoom-in')!.click();
    expect(map.querySelector<HTMLImageElement>('img.leaflet-tile')?.src).toContain('/13/');
    map.querySelector<HTMLAnchorElement>('.leaflet-control-zoom-out')!.click();
    expect(map.querySelector<HTMLImageElement>('img.leaflet-tile')?.src).toContain('/12/');
    fixture.destroy();
  });

  it('libera o mapa ao destruir o componente e permite montar novamente', () => {
    const fixture = TestBed.createComponent(MapComponent);
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector('.map') as HTMLElement;
    expect(container.querySelector('.leaflet-map-pane')).not.toBeNull();
    fixture.destroy();
    expect(container.querySelector('.leaflet-map-pane')).toBeNull();
    const nextFixture = TestBed.createComponent(MapComponent);
    expect(() => nextFixture.detectChanges()).not.toThrow();
    nextFixture.destroy();
  });

  it('seleciona o ponto clicado e move um único marcador', () => {
    // O jsdom implementa SVG, mas não a detecção createSVGRect usada pelo Leaflet.
    const browser = L.Browser as { svg: boolean };
    const previous = browser.svg;
    browser.svg = true;
    const fixture = TestBed.createComponent(MapComponent);
    try {
      fixture.detectChanges();
      const selected: Array<{ lat: number; lon: number }> = [];
      fixture.componentInstance.pointSelected.subscribe(point => selected.push(point));
      const map = fixture.nativeElement.querySelector('.map') as HTMLElement;
      map.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 100, clientY: 100 }));
      map.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 120, clientY: 120 }));
      expect(selected).toHaveLength(2);
      expect(Number.isFinite(selected[0].lat)).toBe(true);
      expect(selected[0]).not.toEqual(selected[1]);
      expect(map.querySelectorAll('.leaflet-overlay-pane path')).toHaveLength(1);
    } finally {
      fixture.destroy();
      browser.svg = previous;
    }
  });
});
