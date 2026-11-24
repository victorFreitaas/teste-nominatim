import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, input, signal } from '@angular/core';
import { DecimalPipe, JsonPipe, KeyValuePipe } from '@angular/common';
import { Coordinates, ReverseLookup } from './nominatim.models';
import { NominatimService } from './nominatim.service';

@Component({
  selector: 'app-reverse-panel',
  standalone: true,
  imports: [DecimalPipe, JsonPipe, KeyValuePipe],
  templateUrl: './reverse-panel.component.html',
  styleUrl: './reverse-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReversePanelComponent {
  readonly point = input<Coordinates | null>(null);
  protected readonly loading = signal(false);
  protected readonly lookup = signal<ReverseLookup | null>(null);
  protected readonly error = signal('');
  private readonly service = inject(NominatimService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      this.point();
      this.lookup.set(null);
      this.error.set('');
    });
  }

  protected async consult(): Promise<void> {
    const point = this.point();
    if (!point || this.loading()) return;
    this.loading.set(true);
    this.lookup.set(null);
    this.error.set('');
    try {
      const lookup = await this.service.reverse(point);
      if (!this.destroyRef.destroyed && this.point() === point) this.lookup.set(lookup);
    } catch (error) {
      if (!this.destroyRef.destroyed && this.point() === point) {
        this.error.set(error instanceof Error ? error.message : 'Falha ao consultar o endereço.');
      }
    } finally {
      if (!this.destroyRef.destroyed) this.loading.set(false);
    }
  }
}
