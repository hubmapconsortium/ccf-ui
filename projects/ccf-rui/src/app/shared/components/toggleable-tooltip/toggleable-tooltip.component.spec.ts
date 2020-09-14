import { Shallow } from 'shallow-render';

import { ToggleableTooltipComponent } from './toggleable-tooltip.component';
import { ToggleableTooltipModule } from './toggleable-tooltip.module';

describe('ToggleableTooltipComponent', () => {
  let shallow: Shallow<ToggleableTooltipComponent>;

  beforeEach(() => {
    shallow = new Shallow(ToggleableTooltipComponent, ToggleableTooltipModule);
  });

  it('should render only the display-right tooltip when "right" is passed in as direction', async () => {
    const { find } = await shallow.render({ bind: { direction: 'right' } });
    expect(find('.display-right')).toHaveFoundOne();
    expect(find('.display-left')).toHaveFound(0);
    expect(find('.display-vertical')).toHaveFound(0);
  });

  it('should render only the display-left tooltip when "left" is passed in as direction', async () => {
    const { find } = await shallow.render({ bind: { direction: 'left' } });
    expect(find('.display-left')).toHaveFoundOne();
    expect(find('.display-right')).toHaveFound(0);
    expect(find('.display-vertical')).toHaveFound(0);
  });

  it('should render only the display-up tooltip when "up" is passed in as direction', async () => {
    const { find } = await shallow.render({ bind: { direction: 'up' } });
    expect(find('.d-up')).toHaveFoundOne();
    expect(find('.d-down')).toHaveFound(0);
    expect(find('.display-right')).toHaveFound(0);
    expect(find('.display-left')).toHaveFound(0);
  });

  it('should render only the display-down tooltip when "down" is passed in as direction', async () => {
    const { find } = await shallow.render({ bind: { direction: 'down' } });
    expect(find('.d-down')).toHaveFoundOne();
    expect(find('.d-up')).toHaveFound(0);
    expect(find('.display-right')).toHaveFound(0);
    expect(find('.display-left')).toHaveFound(0);
  });

  it('should not render the component when visible is set to false', async () => {
    const { find } = await shallow.render({ bind: { visible: false } });
    expect(find('.description')).toHaveFound(0);
  });

  it('should render the component when visible is set to true', async () => {
    const { find } = await shallow.render({ bind: { visible: true } });
    expect(find('.description')).toHaveFoundOne();
  });
});
