import { Shallow } from 'shallow-render';

import { NameInputComponent } from './name-input.component';
import { NameInputModule } from './name-input.module';

describe('NameInputComponent', () => {
  let shallow: Shallow<NameInputComponent>;

  beforeEach(() => {
    shallow = new Shallow(NameInputComponent, NameInputModule);
  });

  it('should update the name with the passed in value', async () => {
    const { instance } = await shallow.render({ bind: {} });
    instance.name = { firstName: 'firstName', middleName: 'middleName', lastName: 'lastName' };
    const mockEvent = { target: { value: 'test' } } as unknown as InputEvent;
    instance.updateName(mockEvent, 'firstName');
    expect(instance.name.firstName).toBe('test');
  });

  it('should emit the UserName object when the name is updated', async () => {
    const { instance, outputs } = await shallow.render({ bind: {} });
    instance.name = { firstName: 'firstName', middleName: 'middleName', lastName: 'lastName' };
    const mockEvent1 = { target: { value: 'test' } } as unknown as InputEvent;
    const mockEvent2 = { target: { value: 'test2' } } as unknown as InputEvent;
    const mockEvent3 = { target: { value: 'test3' } } as unknown as InputEvent;
    instance.updateName(mockEvent1, 'firstName');
    instance.updateName(mockEvent2, 'lastName');
    instance.updateName(mockEvent3, 'middleName');
    expect(outputs.nameChange.emit).toHaveBeenCalledWith({ firstName: 'test', middleName: 'test3', lastName: 'test2' });
  });
});
