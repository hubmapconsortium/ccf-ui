import { DualSliderComponent } from './dual-slider.component';
import { DualSliderModule } from './dual-slider.module';
import { Shallow } from 'shallow-render';
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

    let shallow: Shallow<DualSliderComponent>;

    beforeEach(() => {
        shallow = new Shallow(DualSliderComponent, DualSliderModule)
            .mock(Overlay, mockOverlay);
    });

    it('displays the current range to ng5-slider', async () => {
        const { find } = await shallow.render({ bind: {selection: [20, 80]}});
        const label = find('.range-label').nativeElement as HTMLElement;
        expect(label.textContent).toBe('20-80');
    });

    it('should open slider if clicked', async () => {
        const { find, instance } = await shallow.render();
        const matFormField = find('.mat-form-field').nativeElement as HTMLElement;
        const spy = spyOn(instance, 'toggleSliderPopover');
        matFormField.click();
        expect(spy).toHaveBeenCalled();
    });

    it('updates the selected range if selected values changed', async () => {
        const { outputs, instance } = await shallow.render({ bind: {selection: [20, 80]}});
        instance.selection = [30, 70];
        expect(outputs.selectionChange.emit).toHaveBeenCalledWith([30, 70]);
    });


});
