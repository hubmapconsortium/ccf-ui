import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AggregateResult, ListResult } from 'ccf-database';
import { Shallow } from 'shallow-render';

import { ResultsBrowserComponent } from './results-browser.component';
import { ResultsBrowserModule } from './results-browser.module';
import { SimpleChanges, SimpleChange } from '@angular/core';

function createChangeObject(previousValue: unknown, currentValue: unknown): SimpleChange {
  return {
    currentValue,
    firstChange: true,
    previousValue,
    isFirstChange: () => { return true; }
  };
}

function timeout(duration = 0): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, duration));
}


describe('ResultsBrowserComponent', () => {
  let shallow: Shallow<ResultsBrowserComponent>;

  beforeEach(() => {
    shallow = new Shallow(ResultsBrowserComponent, ResultsBrowserModule)
      .dontMock(ScrollingModule);
  });

  it('should emit the result when one is clicked on', async () => {
    const testData: ListResult[] = [{ '@id': '123', '@type': 'ListResult', id: '123', label: 'test' }];
    const testAggregate: AggregateResult[] = [{ label: 'test', count: 2 }];
    const testBind = { data: testData, aggregateData: testAggregate, resultLabel: 'test' };
    const { find, outputs } = await shallow.render({ bind: testBind });
    const result = find('.result-browser-item');

    result.triggerEventHandler('click', {});
    expect(outputs.resultClicked.emit).toHaveBeenCalled();
  });

  it('should re-run the gradient display logic when the dataLoading Input variable changes to false', async () => {
    const { instance } = await shallow.render();
    const spy = spyOn(instance.virtualScroll, 'measureScrollOffset');
    const changes: SimpleChanges = { dataLoading: createChangeObject(true, false) };

    instance.ngOnChanges(changes);
    expect(spy).toHaveBeenCalled();
  });

  it('should not re-run the gradient display logic when the dataLoading Input variable changes to true', async () => {
    const { instance } = await shallow.render();
    instance.dataLoading = true;
    const spy = spyOn(instance.virtualScroll, 'measureScrollOffset');
    const changes: SimpleChanges = { dataLoading: createChangeObject(false, true) };

    instance.ngOnChanges(changes);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should change atScrollBottom to true when the viewport scrolls to the bottom', async () => {
    const { instance, find } = await shallow.render();
    const scrollViewport = find(CdkVirtualScrollViewport);
    const element = scrollViewport.nativeElement as EventTarget;

    instance.atScrollBottom = false;
    spyOn(instance.virtualScroll, 'measureScrollOffset').and.returnValue(0);
    element.dispatchEvent(new Event('scroll'));
    await timeout();

    expect(instance.atScrollBottom).toBeTrue();
  });

  it('should change atScrollBottom to false when the viewport scrolls not to the bottom', async () => {
    const { instance, find } = await shallow.render();
    const scrollViewport = find(CdkVirtualScrollViewport);
    const element = scrollViewport.nativeElement as EventTarget;

    instance.atScrollBottom = false;
    spyOn(instance.virtualScroll, 'measureScrollOffset').and.returnValue(1);
    element.dispatchEvent(new Event('scroll'));
    await timeout();

    expect(instance.atScrollBottom).not.toBeTrue();
  });
});
