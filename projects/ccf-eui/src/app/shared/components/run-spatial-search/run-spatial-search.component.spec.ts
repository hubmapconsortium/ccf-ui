import { Shallow } from 'shallow-render';

import { RunSpatialSearchComponent } from './run-spatial-search.component';
import { RunSpatialSearchModule } from './run-spatial-search.module';

describe('RunSpatialSearchComponent', () => {
  let shallow: Shallow<RunSpatialSearchComponent>;

  beforeEach(() => {
    shallow = new Shallow(RunSpatialSearchComponent, RunSpatialSearchModule);
  });

  it('should emit buttonClick when button is clicked', async () => {
    const { find, outputs } = await shallow.render({ bind: {} });
    const button = find('.run-spatial-search-button');
    button.triggerEventHandler('click', {});
    expect(outputs.buttonClick.emit).toHaveBeenCalled();
  });
});
