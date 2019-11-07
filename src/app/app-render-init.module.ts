import { InjectionToken, NgModule } from '@angular/core';
import { Style } from 'mapbox-gl';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

export const BLANK_MAPBOX_STYLE = new InjectionToken<Style>('Blank Mapbox style', {
  providedIn: 'root',
  factory: () => ({
    id: 'blank',
    version: 8,
    name: 'Blank',
    center: [0, 0],
    zoom: 0,
    sources: {},
    sprite: 'https://cdn.jsdelivr.net/gh/lukasmartinelli/osm-liberty@gh-pages/sprites/osm-liberty',
    glyphs: 'https://cdn.jsdelivr.net/gh/orangemug/font-glyphs@gh-pages/glyphs/{fontstack}/{range}.pbf',
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: {
          'background-color': 'rgba(255,255,255,1)'
        }
      }
    ]
  })
});

@NgModule({
  imports: [NgxMapboxGLModule],
  exports: [NgxMapboxGLModule]
})
export class AppRenderInitModule {}
