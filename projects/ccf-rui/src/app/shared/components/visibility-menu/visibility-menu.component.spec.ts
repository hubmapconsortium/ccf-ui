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

  it('should emit the visible items when toggleVisibility is called', async () => {
    const { instance, outputs} = await shallow.render({ bind: { items: testItems } });
    testItem.visible = false;
    instance.toggleVisibility(testItem);
    expect(outputs.visibleItemsChange.emit).toHaveBeenCalledWith(instance.visibleItems);
  });

  it('should change selection when toggleSelected is called', async () => {
    const { instance } = await shallow.render({ bind: { items: testItems } });
    instance.toggleSelected(testItem);
    expect(instance.selection).toEqual(testItem);
  });

  it('should set selection to undefined when toggleSelected is called on the selected item', async () => {
    const { instance } = await shallow.render({ bind: { items: testItems } });
    instance.selection = testItem;
    instance.toggleSelected(testItem);
    expect(instance.selection).toBeUndefined();
  });

  it('should emit the selected item when toggleSelected is called', async () => {
    const { instance, outputs} = await shallow.render({ bind: { items: testItems } });
    instance.toggleSelected(testItem);
    expect(outputs.selectionChange.emit).toHaveBeenCalledWith(testItem);
  });

  it('should emit the item when user hovers over an item', async () => {
    const { instance, outputs} = await shallow.render({ bind: { items: testItems } });
    instance.mouseOver(testItem);
    expect(outputs.hover.emit).toHaveBeenCalledWith(testItem);
  });

  it('should emit undefined when the user moves cursor off the item', async () => {
    const { instance, outputs} = await shallow.render({ bind: { items: testItems } });
    instance.mouseOut(testItem);
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

  it('should reset all opacity values to 100 when resetOpacity is called', async () => {
    const { instance } = await shallow.render({ bind: { items: testItems } });
    instance.items[0].opacity = 50;
    instance.resetOpacity();
    expect(instance.items[0].opacity).toEqual(100);
  });

  it('should set the current selection opacity value to 100 when resetOpacity is called', async () => {
    const { instance } = await shallow.render({ bind: { items: testItems } });
    instance.items[0].opacity = 50;
    const spy = spyOn(instance, 'updateOpacity');
    instance.resetOpacity();
    expect(spy).toHaveBeenCalledWith(100);
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
