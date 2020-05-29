import { Shallow } from 'shallow-render';

import { ColorSchemePopupComponent } from './color-scheme-popup.component';
import { ColorSchemePopupModule } from './color-scheme-popup.module';

describe('ColorSchemePopupComponent', () => {
  let shallow: Shallow<ColorSchemePopupComponent>;

  beforeEach(() => {
    shallow = new Shallow(ColorSchemePopupComponent, ColorSchemePopupModule);
  });

  it('should set popup visibility to true when open() is called', async () => {
    const { instance } = await shallow.render();
    instance.popupVisible = false;
    instance.open();
    expect(instance.popupVisible).toBe(true);
  });

  it('should not try to hide the popup if the popup is already not visible', async () => {
    const { instance } = await shallow.render();
    instance.popupVisible = false;

    const testHtmlElement: HTMLElement = document.createElement('div');
    instance.close(testHtmlElement);

    expect(instance.popupVisible).toBeFalse();
  });

  it('should hide the popup if the popup is visible', async () => {
    const { instance } = await shallow.render();
    instance.popupVisible = true;

    const testHtmlElement: HTMLElement = document.createElement('div');
    instance.close(testHtmlElement);

    expect(instance.popupVisible).toBeFalse();
  });
});
