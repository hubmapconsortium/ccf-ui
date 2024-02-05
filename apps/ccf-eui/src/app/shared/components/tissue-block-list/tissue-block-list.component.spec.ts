import { Shallow } from 'shallow-render';

import { TissueBlockListComponent } from './tissue-block-list.component';
import { TissueBlockListModule } from './tissue-block-list.module';

describe('TissueBlockListComponent', () => {
  let shallow: Shallow<TissueBlockListComponent>;

  beforeEach(() => {
    shallow = new Shallow(TissueBlockListComponent, TissueBlockListModule);
  });

  it('creates', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeDefined();
  });
});
