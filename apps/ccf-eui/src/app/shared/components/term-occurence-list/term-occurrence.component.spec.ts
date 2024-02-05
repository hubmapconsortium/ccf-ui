import { Shallow } from 'shallow-render';

import { TermOccurrenceListComponent } from './term-occurrence.component';
import { TermOccurrenceListModule } from './term-occurrence.module';


describe('TermOccurrenceListComponent', () => {
  let shallow: Shallow<TermOccurrenceListComponent>;

  beforeEach(() => {
    shallow = new Shallow(TermOccurrenceListComponent, TermOccurrenceListModule);
  });

  it('creates', async () => {
    const { instance } = await shallow.render();
    expect(instance).toBeDefined();
  });
});
