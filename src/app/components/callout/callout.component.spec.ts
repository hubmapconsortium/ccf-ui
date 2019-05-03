import { FlexibleConnectedPositionStrategy, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { DebugElement, Type } from '@angular/core';
import { Shallow } from 'shallow-render';

import { CalloutComponent } from './callout.component';
import { CalloutModule } from './callout.module';

describe('CalloutComponent', () => {
  let component: CalloutComponent;
  let find: (cssOrDirective: string | Type<any>) => DebugElement & DebugElement[];
  let get: <T>(type: Type<T>) => T;
  let shallow: Shallow<CalloutComponent>;
  let updater: () => void;

  function createMockOverlay(): jasmine.SpyObj<Overlay> {
    const mockedPositionStrategy = jasmine.createSpyObj<FlexibleConnectedPositionStrategy>(['withPositions']);
    const mockedPositionBuilder = jasmine.createSpyObj<OverlayPositionBuilder>(['flexibleConnectedTo']);
    const mockedOverlayRef = jasmine.createSpyObj<OverlayRef>([
      'attach', 'hasAttached', 'updatePosition', 'updatePositionStrategy', 'dispose'
    ]);
    const mockedOverlay = jasmine.createSpyObj<Overlay>(['create', 'position']);
    mockedPositionBuilder.flexibleConnectedTo.and.returnValue(mockedPositionStrategy);
    mockedOverlay.position.and.returnValue(mockedPositionBuilder);
    mockedOverlay.create.and.returnValue(mockedOverlayRef);

    return mockedOverlay;
  }

  beforeEach(async () => {
    // Disable adhoc update solution!
    updater = (CalloutComponent.prototype as any).scheduleUpdates;
    (CalloutComponent.prototype as any).scheduleUpdates = () => undefined;

    shallow = new Shallow(CalloutComponent, CalloutModule)
      .mock(Overlay, createMockOverlay());

    ({ instance: component, get, find } = await shallow.render(`
      <svg:svg viewBox="0 0 100 100" #container>
        <circle r="1" cx="50" cy="50" #centroid></circle>
        <g ccf-callout [boundary]="container" [centroid]="centroid"></g>
      </svg:svg>
    `));
  });

  describe('component', () => {
    // More tests here!
  });

  describe('dom', () => {
    describe('path', () => {
      it('exists', () => {
        expect(find('.callout-line')).toBeTruthy();
      });
    });

    // More tests here!
  });
});
