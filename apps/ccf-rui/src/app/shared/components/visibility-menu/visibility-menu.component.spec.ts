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
  const testItem2 = {
    id: 1,
    name: 'test',
    visible: true,
    opacity: 100
  };
  const testItems = [testItem, testItem2];

  beforeEach(() => {
    shallow = new Shallow(VisibilityMenuComponent, VisibilityMenuModule);
  });

  it('should restore the opacity to the previous opacity', async () => {
    const { instance } = await shallow.render({ bind: { items: testItems } });
    instance.toggleVisibility(instance.items[0]);
    instance.toggleVisibility(instance.items[0]);
    expect(instance.items[0].opacity).toEqual(100);
  });

  it('should toggle the visibility of the currently selected item', async () => {
    const { instance } = await shallow.render({ bind: { items: testItems } });
    instance.mouseOver(instance.items[0]);
    instance.toggleVisibility(instance.items[0]);
    expect(instance.selection?.visible).toBeTrue();
  });


  it('should emit the item when user hovers over an item', async () => {
    const { instance, outputs } = await shallow.render({ bind: { items: testItems } });
    instance.mouseOver(testItem);
    expect(outputs.hover.emit).toHaveBeenCalledWith(testItem);
  });

  it('should emit undefined when the user moves cursor off the item', async () => {
    const { instance, outputs } = await shallow.render({ bind: { items: testItems } });
    instance.mouseOut();
    expect(outputs.hover.emit).toHaveBeenCalledWith(undefined);
  });

  it('should update the opacity of the current item', async () => {
    const { instance } = await shallow.render({ bind: { items: testItems } });
    instance.mouseOver(instance.items[0]);
    instance.updateOpacity(50);
    expect(instance.selection?.opacity).toEqual(50);
  });

  it('should reset the item', async () => {
    const { instance } = await shallow.render({ bind: { items: testItems } });
    instance.mouseOver(instance.items[1]);
    instance.updateOpacity(50);
    instance.toggleVisibility(instance.items[1]);
    instance.resetItem();
    expect(instance.selection?.opacity).toEqual(20);
    expect(instance.selection?.visible).toBeTrue();
  });

  it('should set all opacity values', async () => {
    const { instance } = await shallow.render({ bind: { items: testItems } });
    instance.setAllOpacity(30);
    expect(instance.items[0].opacity).toEqual(30);
    expect(instance.items[1].opacity).toEqual(30);
  });

  it('should return the id with getId', async () => {
    const { instance } = await shallow.render({ bind: { items: testItems } });
    expect(instance.getId(0, testItem)).toEqual(1);
  });
});
