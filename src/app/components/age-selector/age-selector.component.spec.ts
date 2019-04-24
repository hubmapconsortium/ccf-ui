import { FlexibleConnectedPositionStrategy, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { Type, DebugElement } from '@angular/core';
import { Shallow } from 'shallow-render';

import { SearchService } from '../../shared/services/search/search.service';
import { AgeSelectorComponent } from './age-selector.component';
import { AgeSelectorModule } from './age-selector.module';

describe('AgeSelectorComponent', () => {
  let component: AgeSelectorComponent;
  let find: (cssOrDirective: string | Type<any>) => DebugElement & DebugElement[];
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<AgeSelectorComponent>;

  function createMockOverlay(): jasmine.SpyObj<Overlay> {
    const mockedPositionStrategy = jasmine.createSpyObj<FlexibleConnectedPositionStrategy>(['withPositions']);
    const mockedPositionBuilder = jasmine.createSpyObj<OverlayPositionBuilder>(['flexibleConnectedTo']);
    const mockedOverlayRef = jasmine.createSpyObj<OverlayRef>(['attach', 'updatePosition', 'dispose']);
    const mockedOverlay = jasmine.createSpyObj<Overlay>(['create', 'position']);
    mockedPositionBuilder.flexibleConnectedTo.and.returnValue(mockedPositionStrategy);
    mockedOverlay.position.and.returnValue(mockedPositionBuilder);
    mockedOverlay.create.and.returnValue(mockedOverlayRef);

    return mockedOverlay;
  }

  beforeEach(async () => {
    shallow = new Shallow(AgeSelectorComponent, AgeSelectorModule)
      .mock(Overlay, createMockOverlay());

    ({ instance: component, get, find } = await shallow.render());
  });

  describe('component', () => {
    describe('constructor', () => {
      let overlay: jasmine.SpyObj<Overlay>;
      beforeEach(() => overlay = get(Overlay) as any);

      it('creates an OverlayRef', () => {
        expect(overlay.create).toHaveBeenCalled();
      });
    });

    describe('ageRangeLabel', () => {
      describe('when lowValue === highValue', () => {
        beforeEach(() => component.lowValue = component.highValue = 0);

        it('contains single value', () => {
          expect(component.ageRangeLabel).toMatch(/\d+/);
        });
      });

      describe('when lowValue !== highValue', () => {
        it('contains a range', () => {
          expect(component.ageRangeLabel).toMatch(/\d+\s*-\s*\d+/);
        });
      });
    });

    describe('closeSliderPopover(target)', () => {
      function describeNoEffect(description: string, open: boolean, setup?: () => void): void {
        describe(description, () => {
          beforeEach(() => {
            if (setup) { setup(); }
            component.isSliderOpen = open;
            component.closeSliderPopover(undefined);
          });

          it('does nothing', () => {
            expect(component.isSliderOpen).toBe(open);
          });
        });
      }

      describeNoEffect('when slider is closed', false);
      describeNoEffect('when event originates from this component', true, () => {
        const nativeElement = (component as any).element.nativeElement;
        const spy = spyOn(nativeElement, 'contains');
        spy.and.returnValue(true);
      });
      describeNoEffect('when event originates from the popover', true, () => {
        component.popoverElement = { nativeElement: { contains() { return true; } } };
      });

      describe('when event originates from anywhere else on the page', () => {
        beforeEach(() => {
          component.isSliderOpen = true;
          component.closeSliderPopover(undefined);
        });

        it('closes the popover', () => {
          expect(component.isSliderOpen).toBeFalsy();
        });
      });
    });

    describe('toggleSliderPopover()', () => {
      let overlayRef: jasmine.SpyObj<OverlayRef>;
      beforeEach(() => overlayRef = get(Overlay).create() as any);
      beforeEach(() => component.toggleSliderPopover());

      it('initializes the popover', () => {
        expect(overlayRef.attach).toHaveBeenCalled();
      });

      it('updates the popover\'s position', () => {
        expect(overlayRef.updatePosition).toHaveBeenCalled();
      });

      it('toggles the popover open state', () => {
        expect(component.isSliderOpen).toBeTruthy();
      });
    });

    describe('sliderValueChanged()', () => {
      let spy: jasmine.Spy;
      beforeEach(() => {
        spy = spyOn(get(SearchService), 'setAgeRange');
        component.lowValue = component.options.floor + 1;
        component.highValue = component.options.ceil - 1;
      });

      it('sets the search state using SearchService', () => {
        component.sliderValueChanged();
        expect(spy).toHaveBeenCalled();
      });

      it('sets min to undefined when lowValue === floor', () => {
        component.lowValue = component.options.floor;
        component.sliderValueChanged();
        expect(spy).toHaveBeenCalledWith(undefined, jasmine.anything());
      });

      it('sets max to undefined when highValue === ceil', () => {
        component.highValue = component.options.ceil;
        component.sliderValueChanged();
        expect(spy).toHaveBeenCalledWith(jasmine.anything(), undefined);
      });
    });
  });

  describe('dom', () => {
    describe('button', () => {
      it('exists', () => {
        expect(find('.button')).toBeTruthy();
      });
    });
  });
});
