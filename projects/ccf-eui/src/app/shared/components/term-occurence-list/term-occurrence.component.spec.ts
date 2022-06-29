import { MatSelect, MatSelectChange } from '@angular/material/select';
import { Shallow } from 'shallow-render';
import { TermOccurrenceListComponent } from './term-occurrence.component';
import { DropdownModule } from './term-occurrence.module';


describe('DropdownComponent', () => {
  let shallow: Shallow<TermOccurrenceListComponent>;

  beforeEach(() => {
    shallow = new Shallow(TermOccurrenceListComponent, DropdownModule);
  });

  it('should provide the current value to mat-select', async () => {
    console.log('test');
  });
});
