
import { Shallow } from 'shallow-render';
import { ButtonToggleComponent } from './button-toggle.component';

describe('ButtonToggleComponent', () => {
  let shallow: Shallow<ButtonToggleComponent>;
  const menu= ['a','b','c'];

  beforeEach(() => {
    shallow = new Shallow(ButtonToggleComponent,ButtonToggleComponent);
  });

  it('Should Check if item is selected', async () => {
    const { instance } = await shallow.render({ bind: { menuOptions:menu,selectedItems:[menu[0]] } });

    expect(instance.isItemSelected(menu[0])).toBeTrue();
    expect(instance.isItemSelected(menu[1])).toBeFalse();
  });
});
