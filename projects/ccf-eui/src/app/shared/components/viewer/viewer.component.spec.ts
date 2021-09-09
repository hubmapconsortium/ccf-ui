import { SimpleChange } from '@angular/core';
import { Shallow } from 'shallow-render';

import { ViewerComponent } from './viewer.component';
import { ViewerModule } from './viewer.module';


describe('ViewerComponent', () => {
  const url = 'abc.com';
  let shallow: Shallow<ViewerComponent>;

  beforeEach(() => {
    shallow = new Shallow(ViewerComponent, ViewerModule);
  });

  it('should set loading to true when input changes', async () => {
    const { instance } = await shallow.render({ bind: { url } });
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    instance.ngOnChanges({ url: {} as SimpleChange });
    expect(instance.loading).toBeTrue();
  });
});
