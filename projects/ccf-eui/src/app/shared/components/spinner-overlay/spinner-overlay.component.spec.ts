import { Shallow } from 'shallow-render';

import { SpinnerOverlayComponent } from './spinner-overlay.component';
import { SpinnerOverlayModule } from './spinner-overlay.module';

describe('SpinnerOverlayComponent', () => {
  let shallow: Shallow<SpinnerOverlayComponent>;

  beforeEach(() => {
    shallow = new Shallow(SpinnerOverlayComponent, SpinnerOverlayModule);
  });

  it('is invisible when not active', async () => {
    const { element } = await shallow.render({ bind: { active: false } });
    expect(element.nativeElement).not.toHaveClass('active');
  });

  it('is visible when active', async () => {
    const { element } = await shallow.render({ bind: { active: true } });
    expect(element.nativeElement).toHaveClass('active');
  });

  it('contains a text description', async () => {
    const { find } = await shallow.render({ bind: { text: 'Test' } });
    const content = (find('.content')?.nativeElement as HTMLElement)?.innerHTML;
    expect(content).toEqual('Test');
  });
});
