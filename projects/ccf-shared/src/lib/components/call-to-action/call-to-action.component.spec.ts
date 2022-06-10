import { CallToActionModule } from './call-to-action.module';
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

  it('should emit when close button clicked', async () => {
    const { instance } = await shallow.render();
    instance.close();
    expect(instance.closeClicked.emit).toHaveBeenCalledWith();
  });

  it('should emit on call to action emission', async () => {
    const { instance } = await shallow.render();
    instance.callToActionClicked.emit();
    expect(instance.callToActionClicked.emit).toHaveBeenCalledWith();
  });

  it('should emit on close emissions', async () => {
    const { instance } = await shallow.render();
    instance.closeClicked.emit();
    expect(instance.closeClicked.emit).toHaveBeenCalledWith();
  });
});
