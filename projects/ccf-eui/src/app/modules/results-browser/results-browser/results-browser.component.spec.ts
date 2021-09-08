import { Shallow } from 'shallow-render';

import { ListResult } from '../../../core/models/list-result';
import { ResultsBrowserComponent } from './results-browser.component';
import { ResultsBrowserModule } from './results-browser.module';


function makeScrollEventObject(
  clientHeight: number, scrollHeight: number, scrollTop: number
): UIEvent {
  return {
    target: {
      clientHeight,
      scrollHeight,
      scrollTop
    }
  } as unknown as UIEvent;
}

describe('ResultsBrowserComponent', () => {
  let shallow: Shallow<ResultsBrowserComponent>;

  beforeEach(() => {
    shallow = new Shallow(ResultsBrowserComponent, ResultsBrowserModule);
  });

  it('should re-run the gradient display logic on a scroll event', async () => {
    const { instance, find } = await shallow.render();
    const list = find('.results-browser-list');
    const spy = spyOn(instance, 'onScroll');

    list.triggerEventHandler('scroll', {});
    expect(spy).toHaveBeenCalled();
  });

  it('should disable gradient if close to the bottom', async () => {
    const { instance, find } = await shallow.render();
    const list = find('.results-browser-list');

    instance.atScrollBottom = false;
    list.triggerEventHandler('scroll', makeScrollEventObject(100, 200, 100));
    expect(instance.atScrollBottom).toBeTruthy();
  });

  it('should enable gradient if not close to the bottom', async () => {
    const { instance, find } = await shallow.render();
    const list = find('.results-browser-list');

    instance.atScrollBottom = true;
    list.triggerEventHandler('scroll', makeScrollEventObject(100, 300, 100));
    expect(instance.atScrollBottom).toBeFalsy();
  });

  it('should emit the url whenever visitLink is called', async () => {
    const { instance, outputs } = await shallow.render();
    instance.handleLinkClick('test.com');
    expect(outputs.linkClicked.emit).toHaveBeenCalledWith('test.com');
  });

  it('should handle donor card selection', async () => {
    const { instance } = await shallow.render();
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const testResult = {} as ListResult;
    const spy1 = spyOn(instance.listResultSelected, 'next');
    const spy2 = spyOn(instance.listResultDeselected, 'next');
    instance.handleSelection(testResult, true);
    expect(spy1).toHaveBeenCalled();
    instance.handleSelection(testResult, false);
    expect(spy2).toHaveBeenCalled();
  });

  it('onScroll returns nothing if no target', async () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const mockEvent = {
      target: null
    } as UIEvent;
    const { instance } = await shallow.render();
    instance.onScroll(mockEvent);
    expect().nothing();
  });

  it('should emit the item id when hovered over', async () => {
    const { instance, outputs } = await shallow.render();
    instance.handleHover('test');
    expect(outputs.itemHovered.emit).toHaveBeenCalledWith('test');
  });

  it('should emit the itemUnhovered when item is no longer being hovered over', async () => {
    const { instance, outputs } = await shallow.render();
    instance.handleUnhover();
    expect(outputs.itemUnhovered.emit).toHaveBeenCalled();
  });
});
