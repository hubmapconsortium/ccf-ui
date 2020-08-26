import { Shallow } from 'shallow-render';

import { VisibilityMenuComponent } from './visibility-menu.component';
import { VisibilityMenuModule } from './visibility-menu.module';

describe('VisibilityMenuComponent', () => {
  let shallow: Shallow<VisibilityMenuComponent>;
  const testItem = {
    name: 'test',
    selected: false,
    highlighted: false,
    iconSrc: ''
  };
  const testItems = [testItem];

  beforeEach(() => {
    shallow = new Shallow(VisibilityMenuComponent, VisibilityMenuModule);
  });

  it('should change the icon to visible type when toggleHighlight is called on a highlighted item', async () => {
    const { instance } = await shallow.render({ bind: { visibilityItems: testItems } });
    testItem.highlighted = true;
    instance.toggleHighlight(testItem);
    expect(testItem.iconSrc).toEqual('app:visibility_on');
  });

  it('should change the icon to nonvisible type when toggleHighlight is called on a non-highlighted item', async () => {
    const { instance } = await shallow.render({ bind: { visibilityItems: testItems } });
    testItem.highlighted = false;
    instance.toggleHighlight(testItem);
    expect(testItem.iconSrc).toEqual('app:visibility_off');
  });

  it('should emit the highlighted items when toggleHighlight is called', async () => {
    const { instance, outputs} = await shallow.render({ bind: { visibilityItems: testItems } });
    testItem.highlighted = true;
    instance.toggleHighlight(testItem);
    expect(outputs.valueChange.emit).toHaveBeenCalledWith(['test']);
  });

  it('should set the highlight status to false if setHighlight is called on a nonselected item', async () => {
    const { instance } = await shallow.render({ bind: { visibilityItems: testItems } });
    testItem.selected = false;
    testItem.highlighted = true;
    instance.setHighlight(testItem);
    expect(testItem.highlighted).toBeFalse();
  });

  it('should set the highlight status to true if setHighlight is called on a selected item', async () => {
    const { instance } = await shallow.render({ bind: { visibilityItems: testItems } });
    testItem.selected = true;
    instance.setHighlight(testItem);
    expect(testItem.highlighted).toBeTrue();
  });

  it('should toggle selected when toggleSelected is called', async () => {
    const { instance } = await shallow.render({ bind: { visibilityItems: testItems } });
    testItem.selected = false;
    instance.toggleSelected(testItem);
    expect(testItem.selected).toBeTrue();
  });

  it('should update the highlight status when toggleSelected is called', async () => {
    const { instance } = await shallow.render({ bind: { visibilityItems: testItems } });
    const spy = spyOn(instance, 'setHighlight');
    instance.toggleSelected(testItem);
    expect(spy).toHaveBeenCalled();
  });

  it('should highlight the icon if user hovers over the entry', async () => {
    const { instance } = await shallow.render({ bind: { visibilityItems: testItems } });
    instance.hover(testItem);
    expect (testItem.highlighted).toBeTrue();
  });

  it('should call toggleHighlight if user hovers over the entry', async () => {
    const { instance } = await shallow.render({ bind: { visibilityItems: testItems } });
    const spy = spyOn(instance, 'toggleHighlight');
    instance.hover(testItem);
    expect(spy).toHaveBeenCalled();
  });
});
