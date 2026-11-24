import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Página inicial', () => {
  it('apresenta Brasília e as instruções junto ao mapa', async () => {
    await TestBed.configureTestingModule({ imports: [App], providers: [provideHttpClient(), provideHttpClientTesting()] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const page: HTMLElement = fixture.nativeElement;
    expect(page.querySelector('h1')?.textContent).toContain('Brasília');
    expect(page.querySelector('#map-help')?.textContent).toContain('Arraste');
    expect(page.querySelector('app-map .leaflet-container')).not.toBeNull();
    fixture.destroy();
  });
});
