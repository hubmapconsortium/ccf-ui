import { Shallow } from 'shallow-render';
import { ButtonToggleComponent } from './button-toggle.component';
import { ButtonToggleModule } from './button-toggle.module';

describe('ButtonToggleComponent', () => {
  let shallow: Shallow<ButtonToggleComponent>;
  const menu = ['a', 'b', 'c'];

  beforeEach(() => {
    shallow = new Shallow(ButtonToggleComponent, ButtonToggleModule);
  });

  it('Should Check if item is selected', async () => {
    const { instance } = await shallow.render({ bind: { menuOptions: menu, selectedItems: [menu[0]] } });

    expect(instance.isItemSelected(menu[0])).toBeTrue();
    expect(instance.isItemSelected(menu[1])).toBeFalse();
  });

  it('Should toggle button selection', async () => {
    const { instance } = await shallow.render({ bind: { menuOptions: menu, selectedItems: [menu[0]] } });
    instance.toggleSelection(menu[1]);
    expect(instance.isItemSelected(menu[1])).toBeTrue();
    expect(instance.selectedItems).toBeDefined();
    instance.toggleSelection(menu[1]);
    instance.toggleSelection(menu[0]);
    expect(instance.selectedItems?.length).toEqual(0);
  });
});
