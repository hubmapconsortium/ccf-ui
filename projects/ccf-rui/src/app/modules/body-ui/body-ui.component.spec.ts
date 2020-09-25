import { BodyUI } from 'ccf-body-ui';
import { of } from 'rxjs';
import { Shallow } from 'shallow-render';

import { ModelState } from '../../core/store/model/model.state';
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
    const mockModelState = jasmine.createSpyObj<ModelState>(
      'ModelState', ['setViewType', 'setViewSide']
    );

    shallow = new Shallow(BodyUiComponent, BodyUiModule)
      .mock(ModelState, {
        ...mockModelState,
        viewType$: of('register'),
        viewSide$: of('anterior')
      })
      .mock(BodyUI, mockBodyUI);
  });
});
