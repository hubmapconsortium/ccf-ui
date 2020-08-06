import { Shallow } from 'shallow-render';

import { HeaderComponent } from './header.component';
import { HeaderModule } from './header.module';

describe('HeaderComponent', () => {
  let shallow: Shallow<HeaderComponent>;
  const testFilter = { sex: 'Both', ageRange: [5, 99], bmiRange: [30, 80] };

  beforeEach(() => {
    shallow = new Shallow(HeaderComponent, HeaderModule);
  });

  it('should emit downloadClicked when download button is clicked', async () => {
    const { find, outputs } = await shallow.render();
    find('.download-icon').triggerEventHandler('click', {});
    expect(outputs.downloadClicked.emit).toHaveBeenCalled();
  });

  it('should emit refreshClicked when refresh button is clicked', async () => {
    const { find, outputs } = await shallow.render();
    find('.refresh').triggerEventHandler('click', {});
    expect(outputs.refreshClicked.emit).toHaveBeenCalled();
  });

  async function testFilterLabel(
    index: number,
    data: Record<string, unknown[] | unknown>,
    result: string
  ): Promise<void> {
    const { find } = await shallow.render({ bind: { filters: data } });
    const label = find(`.filter-labels div:nth-child(${index})`).nativeElement as HTMLElement;
    expect(label.textContent).toBe(result);
  }

  it('should display the current sex', async () => {
    await testFilterLabel(1, testFilter, 'Sex: Both');
  });

  it('should display the current age range', async () => {
    await testFilterLabel(2, testFilter, 'Age: 5-99');
  });

  it('should display the current BMI range', async () => {
    await testFilterLabel(3, testFilter, 'BMI: 30-80');
  });
});
