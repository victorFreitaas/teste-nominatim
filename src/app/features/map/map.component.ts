import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
  output,
  viewChild,
} from '@angular/core';
import * as L from 'leaflet';
import { MAP_CONFIG } from './map.config';
import { Coordinates } from './nominatim.models';

@Component({
  selector: 'app-map',
  standalone: true,
  template: `
    <div #mapContainer class="map" role="region" aria-label="Mapa interativo de Brasília, Distrito Federal" aria-describedby="map-help"></div>
  `,
  styleUrl: './map.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit, OnDestroy {
  readonly pointSelected = output<Coordinates>();
  private readonly container = viewChild.required<ElementRef<HTMLDivElement>>('mapContainer');
  private readonly zone = inject(NgZone);
  private map?: L.Map;
  private marker?: L.CircleMarker;
  private resizeObserver?: ResizeObserver;

  ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      const element = this.container().nativeElement;
      this.map = L.map(element).setView(MAP_CONFIG.center, MAP_CONFIG.zoom);
      L.tileLayer(MAP_CONFIG.tileUrl, MAP_CONFIG.tileOptions).addTo(this.map);
      this.map.on('click', (event: L.LeafletMouseEvent) => {
        const point = {
          lat: Number(event.latlng.lat.toFixed(6)),
          lon: Number(event.latlng.wrap().lng.toFixed(6)),
        };
        if (this.marker) this.marker.setLatLng([point.lat, point.lon]);
        else this.marker = L.circleMarker([point.lat, point.lon], {
          radius: 9, color: '#164e43', fillColor: '#38aa90', fillOpacity: 0.9, weight: 3,
          interactive: false,
        }).addTo(this.map!);
        this.zone.run(() => this.pointSelected.emit(point));
      });

      // Atualiza o tamanho após mudanças de layout ou orientação.
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => this.map?.invalidateSize());
        this.resizeObserver.observe(element);
      }
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.map?.remove();
    this.map = undefined;
  }
}
