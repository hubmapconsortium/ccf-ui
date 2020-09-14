import { Shallow } from 'shallow-render';

import { ExtractionSetDropdownComponent } from './extraction-set-dropdown.component';
import { ExtractionSetDropdownModule } from './extraction-set-dropdown.module';
import { ExtractionSet } from './extraction-set-dropdown.component';

const testSet = {
  name: 'testName',
  organ: 'testOrgan',
  sites: [
    {id: 1, name: 'A', visible: false},
    {id: 2, name: 'B', visible: false},
    {id: 3, name: 'C', visible: false}
  ]
} as ExtractionSet;


describe('ExtractionSetComponent', () => {
  let shallow: Shallow<ExtractionSetDropdownComponent>;

  beforeEach(() => {
    shallow = new Shallow(ExtractionSetDropdownComponent, ExtractionSetDropdownModule);
  });

  it('should change the current selection when selected', async () => {
    const { instance, outputs } = await shallow.render({ bind: {} });
    instance.extractionSetChanged(testSet);
    expect(instance.selected).toEqual(testSet);
  });

  it('should emit the selected set when selected', async () => {
    const { instance, outputs } = await shallow.render({ bind: {} });
    instance.extractionSetChanged(testSet);
    expect(outputs.setChange.emit).toHaveBeenCalledWith(testSet);
  });
});
