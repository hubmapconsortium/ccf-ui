import { BodyUI } from 'ccf-body-ui';
import { Shallow } from 'shallow-render';

import { BodyUiComponent } from './body-ui.component';
import { BodyUiModule } from './body-ui.module';

describe('BodyUiComponent', () => {
  let shallow: Shallow<BodyUiComponent>;
  const mockBodyUI = {
    setScene(...args: unknown[]): BodyUI {
      return undefined as unknown as BodyUI;
    }
  };

  beforeEach(() => {
    shallow = new Shallow(BodyUiComponent, BodyUiModule)
      .mock(BodyUI, mockBodyUI);
  });

  it('exists', () => {
    expect(shallow).toBeTruthy();
  });

  // it('makes the component', async () => {
  //   const { instance } = await shallow.render();
  //   expect(instance).toBeTruthy();
  // });
});
