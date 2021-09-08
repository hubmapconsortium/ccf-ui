import { Overlay, OverlayPositionBuilder, OverlayRef, FlexibleConnectedPositionStrategy } from '@angular/cdk/overlay';
import { Shallow } from 'shallow-render';

import { DualSliderComponent } from './dual-slider.component';
import { DualSliderModule } from './dual-slider.module';


describe('DualSliderComponent', () => {
  let shallow: Shallow<DualSliderComponent>;
  let mockOverlay: jasmine.SpyObj<Overlay>;
  let mockPositionBuilder: jasmine.SpyObj<OverlayPositionBuilder>;
  let mockPositionStrategy: jasmine.SpyObj<FlexibleConnectedPositionStrategy>;
  let mockOverlayRef: jasmine.SpyObj<OverlayRef>;

  beforeEach(() => {
    // Create mocks
    mockOverlay = jasmine.createSpyObj<Overlay>(['create', 'position']);
    mockPositionBuilder = jasmine.createSpyObj<OverlayPositionBuilder>(['flexibleConnectedTo']);
    mockPositionStrategy = jasmine.createSpyObj<FlexibleConnectedPositionStrategy>(['withPositions']);
    mockOverlayRef = jasmine.createSpyObj<OverlayRef>(['attach', 'detach', 'updatePosition', 'dispose']);

    // Connect mocks
    mockOverlay.create.and.returnValue(mockOverlayRef);
    mockOverlay.position.and.returnValue(mockPositionBuilder);
    mockPositionBuilder.flexibleConnectedTo.and.returnValue(mockPositionStrategy);

    shallow = new Shallow(DualSliderComponent, DualSliderModule)
      .mock(Overlay, mockOverlay);
  });

  it('should create an overlay', async () => {
    await shallow.render();
    expect(mockOverlay.create).toHaveBeenCalledTimes(1);
  });

  it('should dispose of the overlay when destroyed', async () => {
    const { instance } = await shallow.render();
    instance.ngOnDestroy();
    expect(mockOverlayRef.dispose).toHaveBeenCalledTimes(1);
  });

  it('displays the current range on closed slider', async () => {
    const { find } = await shallow.render({ bind: { selection: [20, 80] } });
    const label = find('.range-label').nativeElement as HTMLElement;
    expect(label.textContent).toBe('20-80');
  });

  it('should call toggleSliderPopover if clicked', async () => {
    const { find, instance } = await shallow.render();
    const formField = find('.slider-form-field');
    const spy = spyOn(instance, 'toggleSliderPopover');
    formField.triggerEventHandler('click', '');
    expect(spy).toHaveBeenCalled();
  });

  it('should close the slider if user clicks slider again', async () => {
    const { find, instance } = await shallow.render();
    const formField = find('.slider-form-field');
    formField.triggerEventHandler('click', '');
    formField.triggerEventHandler('click', '');
    expect(instance.isSliderOpen).toBe(false);
  });

  it('emits the selected range if selected values changed', async () => {
    const { outputs, instance } = await shallow.render({ bind: { selection: [23, 70] } });
    instance.lowValue = 20;
    instance.highValue = 80;
    instance.sliderValueChanged();
    expect(outputs.selectionChange.emit).toHaveBeenCalledWith([20, 80]);
  });

  it('changes the slider range if valueRange changes', async () => {
    const { instance } = await shallow.render({ bind: { valueRange: [1, 99] } });
    instance.valueRange = [30, 50];
    instance.optionsChanged();
    expect(instance.options.floor).toEqual(30);
    expect(instance.options.ceil).toEqual(50);
  });

  it('changes lowValue to the floor value if floor > lowValue', async () => {
    const { instance } = await shallow.render({ bind: { selection: [10, 66], valueRange: [1, 99] } });
    instance.lowValue = 10;
    instance.highValue = 66;
    instance.valueRange = [30, 50];
    instance.optionsChanged();
    expect(instance.lowValue).toEqual(30);
  });

  it('changes highValue to the ceil value if ceil < highValue', async () => {
    const { instance } = await shallow.render({ bind: { selection: [10, 66], valueRange: [1, 99] } });
    instance.lowValue = 10;
    instance.highValue = 66;
    instance.valueRange = [30, 50];
    instance.optionsChanged();
    expect(instance.highValue).toEqual(50);
  });

  it('changes floor and ceil to 0 if valueRange is undefined', async () => {
    const { instance } = await shallow.render({ bind: { valueRange: undefined } });
    instance.optionsChanged();
    expect(instance.options.floor).toEqual(0);
    expect(instance.options.ceil).toEqual(0);
  });

  it('updates lowValue when inputted directly', async () => {
    const mockEvent = {
      target: {
        value: '5',
        blur: () => undefined
      } as unknown as HTMLElement,
      key:'Enter'
    } as unknown as KeyboardEvent;

    const { instance } = await shallow.render({ bind: { selection: [2, 9] } });
    instance.options = { floor: 1, ceil: 10 };
    instance.onKeyLow(mockEvent);
    expect(instance.lowValue).toBe(5);
  });

  it('updates highValue when inputted directly', async () => {
    const mockEvent = {
      target: {
        value: '8',
        blur: () => undefined
      } as unknown as HTMLElement,
      key:'Enter'
    } as unknown as KeyboardEvent;

    const { instance } = await shallow.render({ bind: { selection: [2, 9] } });
    instance.options = { floor: 1, ceil: 10 };
    instance.onKeyHigh(mockEvent);
    expect(instance.highValue).toBe(8);
  });
});
