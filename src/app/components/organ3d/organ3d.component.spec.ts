import { DebugElement, Type } from '@angular/core';
import { Shallow } from 'shallow-render';

import { Organ3dComponent } from './organ3d.component';
import { Organ3dModule } from './organ3d.module';
import { NgxMapboxGLModule, MapComponent } from 'ngx-mapbox-gl';
import { Map } from 'mapbox-gl';

describe('Organ3dComponent', () => {
  let component: Organ3dComponent;
  let find: (cssOrDirective: string | Type<any>) => DebugElement & DebugElement[];
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<Organ3dComponent>;

  beforeEach(async () => {
    shallow = new Shallow(Organ3dComponent, Organ3dModule);
    ({ instance: component, get, find } = await shallow.render({ bind: { base: 'test.url' } }));
  });

  describe('component', () => {
    it('exists', () => {
      expect(component).toBeTruthy();
    });

    describe('onMapLoad(map)', () => {
      let map: Map;

      beforeEach(() => {
        map = jasmine.createSpyObj('Map', ['addLayer']);
        component.onMapLoad(map);
      });

      it('is called on mgl-map\'s load event', () => {
        const mglMap = find(MapComponent);
        const spy = spyOn(component, 'onMapLoad');

        mglMap.triggerEventHandler('load', {});
        expect(spy).toHaveBeenCalled();
      });

      it('adds layers to the map', () => {
        expect(map.addLayer).toHaveBeenCalled();
      });
    });
  });
});
