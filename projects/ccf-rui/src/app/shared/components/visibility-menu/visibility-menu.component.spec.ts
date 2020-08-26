import { Shallow } from 'shallow-render';

import { VisibilityMenuComponent } from './visibility-menu.component';
import { VisibilityMenuModule } from './visibility-menu.module';

describe('VisibilityMenuComponent', () => {
  let shallow: Shallow<VisibilityMenuComponent>;
  const testItem = {
    name: 'test',
    highlighted: false,
    iconSrc: ''
  };
  const testItems = [testItem];

  beforeEach(() => {
    shallow = new Shallow(VisibilityMenuComponent, VisibilityMenuModule);
  });

  it('should change the icon to visible type when toggleHighlight is called on a non-highlighted item', async () => {
    const { instance } = await shallow.render({ bind: { visibilityItems: testItems } });
    testItem.highlighted = false;
    instance.toggleHighlight(testItem);
    expect(testItem.iconSrc).toEqual('app:visibility_on');
  });

  it('should change the icon to nonvisible type when toggleHighlight is called on a highlighted item', async () => {
    const { instance } = await shallow.render({ bind: { visibilityItems: testItems } });
    testItem.highlighted = true;
    instance.toggleHighlight(testItem);
    expect(testItem.iconSrc).toEqual('app:visibility_off');
  });

  it('should emit the highlighted items when toggleHighlight is called', async () => {
    const { instance, outputs} = await shallow.render({ bind: { visibilityItems: testItems } });
    testItem.highlighted = false;
    instance.toggleHighlight(testItem);
    expect(outputs.highlightChange.emit).toHaveBeenCalledWith([testItem]);
  });

  it('should change selectedItem when toggleSelected is called', async () => {
    const { instance } = await shallow.render({ bind: { visibilityItems: testItems } });
    instance.toggleSelected(testItem);
    expect(instance.selectedItem).toEqual(testItem);
  });

  it('should emit the selected item when toggleSelected is called', async () => {
    const { instance, outputs} = await shallow.render({ bind: { visibilityItems: testItems } });
    instance.toggleSelected(testItem);
    expect(outputs.selectionChange.emit).toHaveBeenCalledWith(testItem);
  });


});
