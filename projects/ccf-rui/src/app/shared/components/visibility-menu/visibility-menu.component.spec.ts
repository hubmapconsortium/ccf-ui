import { Shallow } from 'shallow-render';

import { VisibilityMenuComponent } from './visibility-menu.component';
import { VisibilityMenuModule } from './visibility-menu.module';

describe('VisibilityMenuComponent', () => {
  let shallow: Shallow<VisibilityMenuComponent>;
  const testItem = {
    id: 1,
    name: 'test',
    visible: false,
    opacity: 100
  };
  const testItems = [testItem];

  beforeEach(() => {
    shallow = new Shallow(VisibilityMenuComponent, VisibilityMenuModule);
  });

  it('should enable the slider if a visible item is selected', async () => {
    const testItem2 = {
      id: 1,
      name: 'test',
      visible: true,
      opacity: 100
    };
    const { instance } = await shallow.render({ bind: { items: testItems, selection: testItem2 } });
    instance.toggleVisibility(instance.items[0]);
    expect(instance.disableSlider).toBeFalse();
  });

  it('should emit the item when user hovers over an item', async () => {
    const { instance, outputs} = await shallow.render({ bind: { items: testItems } });
    instance.mouseOver(testItem);
    expect(outputs.hover.emit).toHaveBeenCalledWith(testItem);
  });

  it('should emit undefined when the user moves cursor off the item', async () => {
    const { instance, outputs} = await shallow.render({ bind: { items: testItems } });
    instance.mouseOut();
    expect(outputs.hover.emit).toHaveBeenCalledWith(undefined);
  });

  it('should emit the opacity value when the opacity is updated', async () => {
    const { instance, outputs} = await shallow.render({ bind: { items: testItems } });
    instance.selection = testItem;
    instance.updateOpacity(50);
    expect(instance.selection.opacity).toEqual(50);
    expect(outputs.opacityChange.emit).toHaveBeenCalledWith({ ...testItem, opacity: 50 });
  });

  it('should return when updateOpacity is called when no item is selected', async () => {
    const { instance, outputs} = await shallow.render({ bind: { items: testItems } });
    instance.selection = undefined;
    instance.updateOpacity(50);
    expect(outputs.opacityChange.emit).toHaveBeenCalledTimes(0);
  });

  it('should return the id with getId', async () => {
    const { instance } = await shallow.render({ bind: { items: testItems } });
    expect(instance.getId(0, testItem)).toEqual(1);
  });

  it('should hide an items opacity value when opacity is changed to 100', async () => {
    const { instance } = await shallow.render({ bind: { items: testItems } });
    instance.items[0].opacity = 100;
    expect(instance.isHidden(instance.items[0])).toBeTrue();
  });

  it('should show an items opacity value when opacity is changed to a value less than 100', async () => {
    const { instance } = await shallow.render({ bind: { items: testItems } });
    instance.items[0].opacity = 50;
    expect(instance.isHidden(instance.items[0])).toBeFalse();
  });
});
