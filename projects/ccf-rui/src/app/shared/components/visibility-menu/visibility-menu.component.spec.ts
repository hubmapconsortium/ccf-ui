import { Shallow } from 'shallow-render';

import { VisibilityMenuComponent } from './visibility-menu.component';
import { VisibilityMenuModule } from './visibility-menu.module';

describe('VisibilityMenuComponent', () => {
  let shallow: Shallow<VisibilityMenuComponent>;
  const testItem = {
    id: 1,
    name: 'test',
    visible: false,
    iconSrc: ''
  };
  const testItems = [testItem];

  beforeEach(() => {
    shallow = new Shallow(VisibilityMenuComponent, VisibilityMenuModule);
  });

  it('should change the icon to visible type when toggleVisibility is called on a non-visible item', async () => {
    const { instance } = await shallow.render({ bind: { items: testItems } });
    testItem.visible = false;
    instance.toggleVisibility(testItem);
    expect(testItem.iconSrc).toEqual('app:visibility_on');
  });

  it('should change the icon to nonvisible type when toggleVisibility is called on a visible item', async () => {
    const { instance } = await shallow.render({ bind: { items: testItems } });
    testItem.visible = true;
    instance.toggleVisibility(testItem);
    expect(testItem.iconSrc).toEqual('app:visibility_off');
  });

  it('should emit the visible items when toggleVisibility is called', async () => {
    const { instance, outputs} = await shallow.render({ bind: { items: testItems } });
    testItem.visible = false;
    instance.toggleVisibility(testItem);
    expect(outputs.visibleItemsChange.emit).toHaveBeenCalledWith([testItem]);
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


});
