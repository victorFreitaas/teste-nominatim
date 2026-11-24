import type { LatLngTuple } from 'leaflet';

/** Centraliza as opções para permitir a futura troca do provedor de tiles. */
export const MAP_CONFIG = {
  center: [-15.7939, -47.8828] as LatLngTuple,
  zoom: 12,
  tileUrl: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  tileOptions: {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // Solicita tiles ao terminar a navegação, evitando requisições intermediárias.
    updateWhenIdle: true,
    keepBuffer: 0,
  },
};
