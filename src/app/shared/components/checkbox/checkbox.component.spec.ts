import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { Shallow } from 'shallow-render';

import { CheckboxComponent } from './checkbox.component';
import { CheckboxModule } from './checkbox.module';

describe('FiltersCheckboxComponent', () => {
  let shallow: Shallow<CheckboxComponent>;

  beforeEach(() => {
    shallow = new Shallow(CheckboxComponent, CheckboxModule);
  });

  it('should set the label to value passed in', async () => {
    const { find } = await shallow.render({ bind: { label: 'TestLabel', options: ['Test1'] } });

    expect(find('.filter-label').nativeElement.textContent).toBe('TestLabel');
  });

  it('should trigger filterOnChange when an option is changed', async () => {
    const { findComponent, instance } = await shallow.render({ bind: { label: 'Test', options: ['Test1'] } });
    const spy = spyOn(instance, 'filterOnChange');
    const checkbox = findComponent(MatCheckbox);

    checkbox.change.emit();
    expect(spy).toHaveBeenCalled();
  });

  it('should add an item to the selection array when checked', async () => {
    const { instance } = await shallow.render({ bind: { label: 'Test', options: ['Test1', 'Test2'] } });

    instance.filterOnChange({ 'checked': true } as MatCheckboxChange, 'Test1')
    expect(instance.selection).toContain('Test1');
  });

  it('should remove an item from the selection array when unchecked', async () => {
    const { instance } = await shallow.render({ bind: { label: 'Test', options: ['Test1', 'Test2'] } });
    instance.selection = ['Test1'];

    instance.filterOnChange({ 'checked': false } as MatCheckboxChange, 'Test1');
    expect(instance.selection).not.toContain('Test1');
  });
});
