import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shallow } from 'shallow-render';

import { CallToActionComponent } from './call-to-action.component';
import { CallToActionModule } from './call-to-action.module';


function wait(duration: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, duration);
  });
}

describe('InfoDialogComponent', () => {
  let shallow: Shallow<CallToActionComponent>;

  beforeEach(() => {
    shallow = new Shallow(CallToActionComponent, CallToActionModule)
      .provide({ provide: MatDialogRef, useValue: {} })
      .provide({ provide: MAT_DIALOG_DATA, useValue: [ ] });
  });

  it('should emit on call to action click', async () => {
    const { instance } = await shallow.render();
    instance.onDialogButtonClick();
    expect(instance.callToActionClicked.emit).toHaveBeenCalledWith();
  });

  
  it('should emit on close click', async () => {
    const { instance } = await shallow.render();
    instance.close();
    expect(instance.closeClicked.emit).toHaveBeenCalledWith();
  });
});
