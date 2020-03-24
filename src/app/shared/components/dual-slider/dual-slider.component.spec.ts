import { DualSliderComponent } from './dual-slider.component';
import { DualSliderModule } from './dual-slider.module';
import { Shallow } from 'shallow-render';
import { Overlay, OverlayRef, OverlayPositionBuilder } from '@angular/cdk/overlay';
// import { CdkPortal } from '@angular/cdk/portal';


describe('DualSliderComponent', () => {

    const mockBuilder = {
        flexibleConnectedTo(...args: unknown[]) { return this; },
        withPositions(...args: unknown[]) { return this; }
    };
    const mockOverlayRef: Partial<OverlayRef> = {
        dispose() {},
        // attach() {},
        detach() {},
        updatePosition() {}
    };
    const mockOverlay: Partial<Overlay> = {
        position() { return mockBuilder as unknown as OverlayPositionBuilder; },
        create() { return mockOverlayRef as OverlayRef; },
    };

    let shallow: Shallow<DualSliderComponent>;

    beforeEach(() => {
        shallow = new Shallow(DualSliderComponent, DualSliderModule)
            .mock(Overlay, mockOverlay)
            .mock(OverlayRef, mockOverlayRef);
    });

    it('displays the current range on closed slider', async () => {
        const { find } = await shallow.render({ bind: {selection: [20, 80]}});
        const label = find('.range-label').nativeElement as HTMLElement;
        expect(label.textContent).toBe('20-80');
    });

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

    it('changes lowValue to the floor value if floor > lowValue', async () => {
        const { instance } = await shallow.render({ bind: {selection: [10, 66], valueRange: [1, 99]}});
        instance.lowValue = 10;
        instance.highValue = 66;
        instance.valueRange = [30, 50];
        instance.optionsChanged();
        expect(instance.lowValue).toEqual(30);
    });

    it('changes highValue to the ceil value if ceil < highValue', async () => {
        const { instance } = await shallow.render({ bind: {selection: [10, 66], valueRange: [1, 99]}});
        instance.lowValue = 10;
        instance.highValue = 66;
        instance.valueRange = [30, 50];
        instance.optionsChanged();
        expect(instance.highValue).toEqual(50);
    });

    it('changes floor and ceil to 0 if valueRange is undefined', async () => {
        const { instance } = await shallow.render({ bind: {valueRange: undefined}});
        instance.optionsChanged();
        expect(instance.options.floor).toEqual(0);
        expect(instance.options.ceil).toEqual(0);
    });

    // it('detaches the overlay if slider is initialized and toggleSliderPopover is triggered', async () => {
    //     const { instance } = await shallow.render();
    //     instance.toggleSliderPopover();
    //     instance.toggleSliderPopover();
    //     expect(mockOverlayRef.detach).toHaveBeenCalled();
    // });

    // it('toggles visibility of contents when toggleSliderPopover is called', async () => {
    //     const { instance } = await shallow.render();
    //     instance.toggleSliderPopover();
    //     expect(instance.contentsVisible).toBe('visible');
    //     instance.toggleSliderPopover();
    //     expect(instance.contentsVisible).toBe('invisible');
    // });

    // it('should display the current selected values on the slider', async () => {
    //     const { find, instance } = await shallow.render({ bind: {selection: [10, 90]}});
    //     instance.toggleSliderPopover();
    //     const input = find('.input-low').nativeElement as HTMLInputElement;
    //     expect(input.value).toBe('10');
    // });
});
