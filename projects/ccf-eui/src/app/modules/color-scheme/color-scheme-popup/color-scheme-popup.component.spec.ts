import { Shallow } from 'shallow-render';

import { ImageViewerLayer } from '../../../core/models/image-viewer-layer';
import { ColorSchemePopupComponent } from './color-scheme-popup.component';
import { ColorSchemePopupModule } from './color-scheme-popup.module';

function testLayer(): ImageViewerLayer {
  return new ImageViewerLayer({
    selected: false,
    label: 'Option 1',
    id: '1',
    colorScheme: {
      type: 'discrete',
      name: 'bluered',
      colors: ['#2166AC', '#67A9CF', '#D1E5F0', '#F7F7F7', '#FDDBC7', '#EF8A62', '#B2182B'],
      positions: [0, .166, .333, .5, .666, .833, 1]
    },
    color: '#2166AC',
    brightness: [20, 60],
    transparency: 100,
    customizedColor: false,
    selectionOrder: 0,
    defaultOrder: -1
  });
}

describe('ColorSchemePopupComponent', () => {
  let shallow: Shallow<ColorSchemePopupComponent>;

  beforeEach(() => {
    shallow = new Shallow(ColorSchemePopupComponent, ColorSchemePopupModule);
  });

  it('should set popup visibility to true when open() is called', async () => {
    const mouseclick = new MouseEvent('mouseclick');
    const { instance } = await shallow.render();
    instance.popupVisible = false;
    instance.open(mouseclick);
    expect(instance.popupVisible).toBe(true);
  });

  it('should not try to hide the popup if the popup is already not visible', async () => {
    const layer = testLayer();
    const { instance } = await shallow.render({ bind: { layer } });
    instance.popupVisible = false;

    const testHtmlElement: HTMLElement = document.createElement('div');
    instance.close(testHtmlElement);

    expect(instance.popupVisible).toBeFalse();
  });

  it('should hide the popup if the popup is visible', async () => {
    const layer = testLayer();
    const { instance } = await shallow.render({ bind: { layer } });
    instance.popupVisible = true;

    const testHtmlElement: HTMLElement = document.createElement('div');
    const testPopup: HTMLElement = document.createElement('ccf-color-scheme-contents');
    testPopup.setAttribute('class', ('scheme-popup show'));
    const testIcon: HTMLElement = document.createElement('div');
    testIcon.setAttribute('class', ('color-icon Option 1'));
    document.body.append(testPopup);
    document.body.append(testIcon);
    instance.close(testHtmlElement);

    expect(instance.popupVisible).toBeFalse();
  });
});
