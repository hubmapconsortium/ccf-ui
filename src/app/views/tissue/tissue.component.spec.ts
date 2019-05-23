import { DebugElement, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Shallow } from 'shallow-render';
import * as openseadragon from 'openseadragon';

import { TissueDataService } from '../../shared/services/tissue-data/tissue-data.service';
import { TissueRoutingModule } from './tissue-routing.module';
import { TissueComponent } from './tissue.component';
import { TissueModule } from './tissue.module';

describe('TissueComponent', () => {
  let component: TissueComponent;
  let find: (cssOrDirective: string | Type<any>) => DebugElement & DebugElement[];
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<TissueComponent>;

  function createMockTissueDataService(): TissueDataService {
    const mock = jasmine.createSpyObj<TissueDataService>([
      'getTissueSourcePath', 'getTissueOverlays', 'getMetadata', 'getOrganName'
    ]);
    mock.getMetadata.and.returnValue(new BehaviorSubject({ foo: 'bar' }));
    mock.getOrganName.and.returnValue(new BehaviorSubject('an_organ'));
    mock.getTissueOverlays.and.returnValue(new BehaviorSubject([{ label: 'o1', overlayUrl: 'an_url' }]));
    mock.getTissueSourcePath.and.returnValue(new BehaviorSubject('an_image_url'));

    return mock;
  }

  beforeEach(() => {
    // Override Open Seadragon
    const overlay = jasmine.createSpyObj(['node']);
    const viewer = jasmine.createSpyObj(['addHandler', 'destroy', 'open', 'svgOverlay']);
    const viewport = jasmine.createSpyObj(['getBounds']);
    const world = jasmine.createSpyObj(['getItemAt']);

    overlay.node.and.returnValue({ appendChild() { } });
    viewer.svgOverlay.and.returnValue(overlay);
    viewer.addHandler.and.callFake((_: any, handler: Function) => handler());
    viewer.viewport = viewport;
    viewer.world = world;
    viewport.getBounds.and.returnValue({ x: 1, y: 2, width: 3, height: 4 });
    world.getItemAt.and.returnValue({ source: { dimensions: { x: 5, y: 6 } } });

    spyOn(openseadragon, 'Viewer').and.returnValue(viewer);
  });

  beforeEach(async () => {
    shallow = new Shallow(TissueComponent, TissueModule)
      .dontMock(TissueRoutingModule)
      .provide(TissueDataService)
      .mock(TissueDataService, createMockTissueDataService());

    ({ instance: component, get, find } = await shallow.render());
  });

  describe('component', () => {
    describe('viewer', () => {
      it('initializes the Open Seadragon Viewer', () => {
        expect(openseadragon.Viewer).toHaveBeenCalled();
      });
    });

    describe('overlayWidth', () => {
      it('is calculated from the viewer', () => {
        expect(component.overlayWidth).toEqual(5);
      });
    });

    describe('overlayHeight', () => {
      it('is calculated from the viewer', () => {
        expect(component.overlayHeight).toEqual(8);
      });
    });

    describe('overlayViewBox', () => {
      it('is fetched from the original image', () => {
        expect(component.overlayViewBox).toEqual('0 0 5 6');
      });
    });

    describe('displayState(cond)', () => {
      it('returns \'none\' when the condition is falsy', () => {
        expect(component.displayState(false)).toEqual('none');
      });

      it('returns undefined when the condition is truthy', () => {
        expect(component.displayState(true)).toEqual(undefined);
      });
    });

    describe('isVisible(overlay)', () => {
      const o1: any = { };
      const o2: any = { };

      beforeEach(() => {
        (component as any).overlayVisibility.set(o1, 1);
      });

      it('returns true if the overlay is visible', () => {
        expect(component.isVisible(o1)).toBeTruthy();
      });

      it('returns false for hidden overlays', () => {
        expect(component.isVisible(o2)).toBeFalsy();
      });
    });

    describe('setVisibility(overlay, state, always?)', () => {
      const o1: any = { };
      let visibility: WeakMap<any, number>;

      beforeEach(() => visibility = (component as any).overlayVisibility);

      it('sets a bit on \'on\'', () => {
        component.setVisibility(o1, 'on');
        expect(visibility.get(o1)).toEqual(1);
      });

      it('clears a bit on \'off\'', () => {
        component.setVisibility(o1, 'off');
        expect(visibility.get(o1)).toEqual(0);
      });

      it('toggles a bit on \'toggle\'', () => {
        component.setVisibility(o1, 'toggle');
        expect(visibility.get(o1)).toEqual(1);
      });

      it('updates the always bit when specified', () => {
        component.setVisibility(o1, 'on', 'always');
        expect(visibility.get(o1)).toEqual(2);
      });
    });
  });

  describe('dom', () => {
    // TODO
  });
});
