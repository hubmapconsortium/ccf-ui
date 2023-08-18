import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Shallow } from 'shallow-render';
import { DropdownComponent } from './dropdown.component';
import { DropdownModule } from './dropdown.module';


describe('DropdownComponent', () => {
  let shallow: Shallow<DropdownComponent>;

  beforeEach(() => {
    shallow = new Shallow(DropdownComponent, DropdownModule);
  });

  it('should provide the current value to mat-select', async () => {
    const { findComponent } = await shallow.render({ bind: { selection: 'one' } });
    const matSelect = findComponent(MatSelect);
    expect(matSelect.value).toBe('one');
  });

  it('should open options if clicked', async () => {
    const { findComponent, instance } = await shallow.render();
    const matSelect = findComponent(MatSelect);
    const spy = spyOn(instance, 'toggleOptions');
    matSelect.openedChange.emit();
    expect(spy).toHaveBeenCalled();
  });

  it('should change options if clicked', async () => {
    const { findComponent, instance } = await shallow.render();
    const matSelect = findComponent(MatSelect);
    const spy = spyOn(instance, 'selectionChanged');
    matSelect.selectionChange.emit({ value: 'two' } as MatSelectChange);
    expect(spy).toHaveBeenCalledWith('two');
  });

  it('changes invisible to visible when toggled', async () => {
    const { instance } = await shallow.render();
    instance.optionsVisible = 'invisible';
    instance.toggleOptions();
    expect(instance.optionsVisible).toBe('visible');
    instance.toggleOptions();
    expect(instance.optionsVisible).toBe('invisible');
  });

  it('updates the current selection when selected', async () => {
    const { instance, outputs } = await shallow.render();
    instance.selectionChanged('two');
    expect(instance.selection).toBe('two');
    expect(outputs.selectionChange.emit).toHaveBeenCalledWith('two');
  });
});
