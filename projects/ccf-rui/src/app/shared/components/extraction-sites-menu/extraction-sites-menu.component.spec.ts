import { Shallow } from 'shallow-render';

import { ExtractionSitesMenuComponent } from './extraction-sites-menu.component';
import { ExtractionSitesMenuModule } from './extraction-sites-menu.module';

describe('ExtractionSitesMenuComponent', () => {
  let shallow: Shallow<ExtractionSitesMenuComponent>;
  const testSite = {
    name: 'test',
    selected: false,
    highlighted: false,
    iconSrc: ''
  };

  beforeEach(() => {
    shallow = new Shallow(ExtractionSitesMenuComponent, ExtractionSitesMenuModule);
  });

  it('should change the icon to visible type when toggleHighlight is called on a highlighted site', async () => {
    const { instance } = await shallow.render();
    testSite.highlighted = true;
    instance.toggleHighlight(testSite);
    expect(testSite.iconSrc).toEqual('app:visibility_on');
  });

  it('should change the icon to nonvisible type when toggleHighlight is called on a non-highlighted site', async () => {
    const { instance } = await shallow.render();
    testSite.highlighted = false;
    instance.toggleHighlight(testSite);
    expect(testSite.iconSrc).toEqual('app:visibility_off');
  });

  it('should emit the highlighted sites when toggleHighlight is called', async () => {
    const { instance, outputs} = await shallow.render();
    testSite.highlighted = true;
    const testSites = [testSite];
    instance.extractionSites = testSites;
    instance.toggleHighlight(testSite);
    expect(outputs.valueChange.emit).toHaveBeenCalledWith(['test']);
  });

  it('should set the highlight status to false if setHighlight is called on a nonselected site', async () => {
    const { instance } = await shallow.render();
    testSite.selected = false;
    testSite.highlighted = true;
    instance.setHighlight(testSite);
    expect(testSite.highlighted).toBeFalse();
  });

  it('should set the highlight status to true if setHighlight is called on a selected site', async () => {
    const { instance } = await shallow.render();
    testSite.selected = true;
    instance.setHighlight(testSite);
    expect(testSite.highlighted).toBeTrue();
  });

  it('should toggle selected when toggleSelected is called', async () => {
    const { instance } = await shallow.render();
    testSite.selected = false;
    instance.toggleSelected(testSite);
    expect(testSite.selected).toBeTrue();
  });

  it('should update the highlight status when toggleSelected is called', async () => {
    const { instance } = await shallow.render();
    const spy = spyOn(instance, 'setHighlight');
    instance.toggleSelected(testSite);
    expect(spy).toHaveBeenCalled();
  });

  it('should highlight the icon if user hovers over the entry', async () => {
    const { instance } = await shallow.render();
    instance.hover(testSite);
    expect (testSite.highlighted).toBeTrue();
  });

  it('should call toggleHighlight if user hovers over the entry', async () => {
    const { instance } = await shallow.render();
    const spy = spyOn(instance, 'toggleHighlight');
    instance.hover(testSite);
    expect(spy).toHaveBeenCalled();
  });
});
