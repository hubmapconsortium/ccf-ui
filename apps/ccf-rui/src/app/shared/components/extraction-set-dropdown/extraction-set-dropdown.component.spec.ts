import { Shallow } from 'shallow-render';

import { ExtractionSetDropdownComponent } from './extraction-set-dropdown.component';
import { ExtractionSetDropdownModule } from './extraction-set-dropdown.module';
import { ExtractionSet } from '../../../core/models/extraction-set';

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const testSet = {
  name: 'testName',
  organ: 'testOrgan',
  sites: [
    { id: 1, name: 'A', visible: false },
    { id: 2, name: 'B', visible: false },
    { id: 3, name: 'C', visible: false }
  ]
} as ExtractionSet;


describe('ExtractionSetComponent', () => {
  let shallow: Shallow<ExtractionSetDropdownComponent>;

  beforeEach(() => {
    shallow = new Shallow(ExtractionSetDropdownComponent, ExtractionSetDropdownModule);
  });

  it('should change the current selection when selected', async () => {
    const { instance } = await shallow.render({ bind: { sets: [testSet] } });
    instance.extractionSetChanged(testSet);
    expect(instance.selected).toEqual(testSet);
  });

  it('should emit the selected set when selected', async () => {
    const { instance, outputs } = await shallow.render({ bind: { sets: [testSet] } });
    instance.extractionSetChanged(testSet);
    expect(outputs.setChange.emit).toHaveBeenCalledWith(testSet);
  });

  it('should display the dropdown if there is more than one extraction set', async () => {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const testSet2 = {
      name: 'testName',
      organ: 'testOrgan',
      sites: [
        { id: 3, name: 'D', visible: false },
        { id: 4, name: 'E', visible: false },
        { id: 5, name: 'F', visible: false }
      ]
    } as ExtractionSet;
    const { instance } = await shallow.render({ bind: { sets: [testSet, testSet2] } });
    expect(instance.isMultiple()).toBeTrue();
  });

  it('should not display the dropdown if there is only one extraction set', async () => {
    const { instance } = await shallow.render({ bind: { sets: [testSet] } });
    expect(instance.isMultiple()).toBeFalse();
  });
});
