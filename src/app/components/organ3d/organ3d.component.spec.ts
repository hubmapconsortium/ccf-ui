import { DebugElement, Type } from '@angular/core';
import { Map } from 'mapbox-gl';
import { MapComponent } from 'ngx-mapbox-gl';
import { Shallow } from 'shallow-render';
import { Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { Organ3dComponent } from './organ3d.component';
import { Organ3dModule } from './organ3d.module';

describe('Organ3dComponent', () => {
  const base = 'test.url';
  let component: Organ3dComponent;
  let find: (cssOrDirective: string | Type<any>) => DebugElement & DebugElement[];
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<Organ3dComponent>;

  beforeEach(async () => {
    shallow = new Shallow(Organ3dComponent, Organ3dModule);
    ({ instance: component, get, find } = await shallow.render({ bind: { base } }));
  });

  describe('component', () => {
    let map: Map;
    let scene: Scene;
    let loadSpy: jasmine.Spy;

    function setLoadValue(value: any): void {
      loadSpy.and.callFake((_url, done) => done(value));
    }

    function setErrorValue(value: any): void {
      loadSpy.and.callFake((_url, _done, _progress, error) => error(value));
    }

    beforeEach(() => {
      map = jasmine.createSpyObj('Map', ['addLayer']);
      scene = new Scene();
      loadSpy = spyOn(GLTFLoader.prototype, 'load');
    });

    it('exists', () => {
      expect(component).toBeTruthy();
    });

    describe('ngOnChange(changes)', () => {
      beforeEach(() => {
        component.onMapLoad(map);
        component['baseScene'] = scene;
        loadSpy.calls.reset();
      });

      it('loads a new base model if changed', () => {
        component.ngOnChanges({ base: {} as any });

        expect(loadSpy).toHaveBeenCalledTimes(1);
      });

      it('updates base rotation if changed', () => {
        const spy = spyOn(component as any, 'setPositionScaleRotation').and.callThrough();
        component.ngOnChanges({ baseRotation: {} as any });

        expect(spy).toHaveBeenCalled();
      });
    });

    describe('onMapLoad(map)', () => {
      it('is called on mgl-map\'s load event', () => {
        const mglMap = find(MapComponent);
        const spy = spyOn(component, 'onMapLoad');

        mglMap.triggerEventHandler('load', {});
        expect(spy).toHaveBeenCalled();
      });

      it('adds layers to the map', () => {
        component.onMapLoad(map);
        expect(map.addLayer).toHaveBeenCalled();
      });

      it('loads the base model', () => {
        setLoadValue({ scene });
        component.onMapLoad(map);

        expect(loadSpy).toHaveBeenCalled();
      });
    });
  });
});
