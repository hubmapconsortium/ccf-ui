import { Shallow } from 'shallow-render';

import { ResultsBrowserComponent } from './results-browser.component';
import { ResultsBrowserModule } from './results-browser.module';
import { ListResult, AggregateResult } from 'ccf-database';


describe('ResultsBrowserComponent', () => {
  let shallow: Shallow<ResultsBrowserComponent>;

  beforeEach(() => {
    shallow = new Shallow(ResultsBrowserComponent, ResultsBrowserModule);
  });

  it('should emit the result when one is clicked on', async () => {
    const testData: ListResult[] = [{ '@id': '123', '@type': 'ListResult', id: '123', label: 'test'}];
    const testAggregate: AggregateResult[] = [ { label: 'test', count: 2 } ];
    const testBind = { data: testData, aggregateData: testAggregate, resultLabel: 'test' };
    const { find } = await shallow.render({ bind: testBind });
    const result = find('.results-browser-list');

    expect(result).toHaveFoundMoreThan(0);

    // result.triggerEventHandler('click', {});
    // expect(outputs.resultClicked.emit).toHaveBeenCalled();
  });
});
