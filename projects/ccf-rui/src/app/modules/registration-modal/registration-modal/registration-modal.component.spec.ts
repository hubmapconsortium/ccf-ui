import { MatDialog } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';

import { RegistrationModalComponent } from './registration-modal.component';
import { RegistrationModalModule } from './registration-modal.module';

describe('RegistrationModalComponent', () => {
  let shallow: Shallow<RegistrationModalComponent>;

  beforeEach(() => {
    shallow = new Shallow(RegistrationModalComponent, RegistrationModalModule);
  });

  it('should open the dialog when the openDialog() method is called', async () => {
    const { instance, get } = await shallow
      .mock(MatDialog, { open() { return {}; } })
      .render();
    instance.openDialog();
    expect(get(MatDialog).open).toHaveBeenCalled();
  });
});
