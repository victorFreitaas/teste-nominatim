import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MapComponent } from './features/map/map.component';
import { ReversePanelComponent } from './features/map/reverse-panel.component';
import { Coordinates } from './features/map/nominatim.models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapComponent, ReversePanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly selectedPoint = signal<Coordinates | null>(null);
}
