import { DualSliderComponent } from './dual-slider.component';
import { DualSliderModule } from './dual-slider.module';
import { Shallow } from 'shallow-render';

describe('DualSliderComponent', () => {
    let shallow: Shallow<DualSliderComponent>;

    beforeEach(() => {
      shallow = new Shallow(DualSliderComponent, DualSliderModule);
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
