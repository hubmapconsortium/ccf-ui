import { Shallow } from 'shallow-render';

import { HeaderComponent } from './header.component';
import { HeaderModule } from './header.module';

describe('HeaderComponent', () => {
  let shallow: Shallow<HeaderComponent>;

  beforeEach(() => {
    shallow = new Shallow(HeaderComponent, HeaderModule);
  });

  it('should emit downloadClicked when download button is clicked', async () => {
    const { find, instance, outputs } = await shallow.render();
    find('.download').triggerEventHandler('click', {});
    expect(outputs.downloadClicked.emit).toHaveBeenCalled();
  });

  it('should emit logoClicked when logo is clicked', async () => {
    const { find, instance, outputs } = await shallow.render();
    find('.logo').triggerEventHandler('click', {});
    expect(outputs.logoClicked.emit).toHaveBeenCalled();
  });

  it('should display the current sex', async () => {
    const { find } = await shallow
      .render({bind: {filters: { sex: 'Both', ageRange: [1, 110], BMIRange: [13, 83] }}});
    const label = find('.filter-labels').nativeElement as HTMLElement;
    expect(label.textContent).toContain('Sex: Both');
  });

  it('should display the current age range', async () => {
    const { find } = await shallow
      .render({bind: {filters: { sex: 'Both', ageRange: [1, 110], BMIRange: [13, 83] }}});
    const label = find('.filter-labels').nativeElement as HTMLElement;
    expect(label.textContent).toContain('Age: 1-110');
  });

  it('should display the current filter range', async () => {
    const { find } = await shallow
      .render({bind: {filters: { sex: 'Both', ageRange: [1, 110], BMIRange: [13, 83] }}});
    const label = find('.filter-labels').nativeElement as HTMLElement;
    expect(label.textContent).toContain('BMI: 13-83');
  });
});
