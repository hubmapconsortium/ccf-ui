import { CallToActionModule } from 'ccf-shared';
import { Shallow } from 'shallow-render';
import { CallToActionComponent } from './call-to-action.component';


describe('CallToActionComponent', () => {
  let shallow: Shallow<CallToActionComponent>;

  beforeEach(() => {
    shallow = new Shallow(CallToActionComponent, CallToActionModule);
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
