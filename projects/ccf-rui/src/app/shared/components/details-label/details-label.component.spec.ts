import { Shallow } from 'shallow-render';

import { DetailsLabelComponent } from './details-label.component';
import { DetailsLabelModule } from './details-label.module';

describe('DetailsLabelComponent', () => {
  let shallow: Shallow<DetailsLabelComponent>;

  beforeEach(() => {
    shallow = new Shallow(DetailsLabelComponent, DetailsLabelModule);
  });

  it('should properly convert the array input into a string', async () => {
    const details = ['test', 'test'];
    const { instance } = await shallow.render({ bind: { details } });

    const result = instance.arrayToString(details);
    expect(typeof(result)).toEqual('string');
  });

  it('should insert the correct number of commas into the string for display.', async () => {
    const details = ['liver', 'front', 'male'];
    const { instance } = await shallow.render({ bind: { details } });

    const result = instance.arrayToString(details);
    const commaSearch = result.match(/,/g);
    const commaCount = commaSearch?.length;

    expect(commaCount).toEqual(2);
  });
});
