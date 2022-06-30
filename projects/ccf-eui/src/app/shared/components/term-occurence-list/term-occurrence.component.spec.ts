import { Shallow } from 'shallow-render';
import { TermOccurrenceListComponent } from './term-occurrence.component';
import { TermOccurrenceListModule } from './term-occurrence.module';


describe('DropdownComponent', () => {
  let shallow: Shallow<TermOccurrenceListComponent>;

  beforeEach(() => {
    shallow = new Shallow(TermOccurrenceListComponent, TermOccurrenceListModule);
  });

  it('should provide the current value to mat-select', async () => {
    console.log('test');
  });
});
