import { Shallow } from 'shallow-render';

import { CallToActionComponent } from './call-to-action.component';
import { CallToActionModule } from './call-to-action.module';


describe('CallToActionComponent', () => {
  let shallow: Shallow<CallToActionComponent>;

  beforeEach(() => {
    shallow = new Shallow(CallToActionComponent, CallToActionModule);
  });

  it('should emit on call to action click', async () => {
    const { instance, outputs } = await shallow.render();
    instance.onDialogButtonClick();
    expect(outputs.callToActionClicked.emit).toHaveBeenCalled();
  });

  it('should emit when close button clicked', async () => {
    const { instance, outputs } = await shallow.render();
    instance.close();
    expect(outputs.closeClicked.emit).toHaveBeenCalled();
  });
});
