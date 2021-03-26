import { Shallow } from 'shallow-render';

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
    } as Element as EventTarget
  } as UIEvent;
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
    instance.visitLink('test.com');
    expect(outputs.resultClicked.emit).toHaveBeenCalledWith('test.com');
  });
});
