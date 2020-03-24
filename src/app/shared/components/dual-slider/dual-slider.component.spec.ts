import { DualSliderComponent } from './dual-slider.component';
import { DualSliderModule } from './dual-slider.module';
import { Shallow } from 'shallow-render';
import { Options } from 'ng5-slider';
import { ElementRef } from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef, OverlayPositionBuilder } from '@angular/cdk/overlay';


describe('DualSliderComponent', () => {
    const mockBuilder = {
        flexibleConnectedTo(...args: unknown[]) { return this; },
        withPositions(...args: unknown[]) { return this; }
    };
    const mockOverlayRef: Partial<OverlayRef> = {
        dispose() {}
    };
    const mockOverlay: Partial<Overlay> = {
        position() { return mockBuilder as unknown as OverlayPositionBuilder; },
        create(config?: unknown) { return mockOverlayRef as OverlayRef; }
    };

    const mockOptions: Partial<Options> = {
        floor: 1,
        ceil: 99,
        step: 1,
        hideLimitLabels: true,
        hidePointerLabels: true
    };

    let shallow: Shallow<DualSliderComponent>;

    beforeEach(() => {
        shallow = new Shallow(DualSliderComponent, DualSliderModule)
            .mock(Overlay, mockOverlay);
    });

    // Works
    it('displays the current range on closed slider', async () => {
        const { find } = await shallow.render({ bind: {selection: [20, 80]}});
        const label = find('.range-label').nativeElement as HTMLElement;
        expect(label.textContent).toBe('20-80');
    });

    // Works
    it('should call toggleSliderPopover if clicked', async () => {
        const { find, instance } = await shallow.render();
        const formField = find('.form-field');
        const spy = spyOn(instance, 'toggleSliderPopover');
        formField.triggerEventHandler('click', '');
        expect(spy).toHaveBeenCalled();
    });

    it('should close the slider if user clicks slider again', async () => {
        const { find, instance } = await shallow.render();
        const formField = find('.form-field');
        formField.triggerEventHandler('click', '');
        formField.triggerEventHandler('click', '');
        expect(instance.isSliderOpen).toBe(false);
    });

    it('emits the selected range if selected values changed', async () => {
        const { outputs, instance } = await shallow.render({ bind: {selection: [23, 70]}});
        instance.lowValue = 20;
        instance.highValue = 80;
        instance.sliderValueChanged();
        expect(outputs.selectionChange.emit).toHaveBeenCalledWith([20, 80]);
    });

    it('changes the slider range if valueRange changes', async () => {
        const { instance } = await shallow.render({ bind: {valueRange: [1, 99]}});
        instance.valueRange = [30, 50];
        instance.optionsChanged();
        expect(instance.options.floor).toEqual(30);
        expect(instance.options.ceil).toEqual(50);
    });

    // it('should display the current selected values on the slider', async () => {
    //     const { find, instance } = await shallow.render({ bind: {selection: [10, 90]}});
    //     const formField = find('.form-field');
    //     formField.triggerEventHandler('click', '');

    //     const input = find('.input-low').nativeElement;
    //     expect(input.value).toBe('10');
    // });


});
