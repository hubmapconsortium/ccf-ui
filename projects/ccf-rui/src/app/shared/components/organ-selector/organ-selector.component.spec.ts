import { Shallow } from 'shallow-render';

import { OrganSelectorComponent } from './organ-selector.component';
import { OrganSelectorModule } from './organ-selector.module';
import { OrganInfo } from './organ-selector.component';

describe('OrganSelectorComponent', () => {
  let shallow: Shallow<OrganSelectorComponent>;

  beforeEach(() => {
    shallow = new Shallow(OrganSelectorComponent, OrganSelectorModule);
  });

  it('should shift the carousel left if dir === left.', async () => {
    const { find, instance } = await shallow.render();
    const carousel = find('.carousel-item-list').nativeElement as HTMLElement;
    carousel.style.left = '80px';
    instance.onLeft = false;
    instance.shift('left');
    expect(carousel.style.left).toBe('136px');
  });

  it('should shift the carousel right if dir === right.', async () => {
    const { find, instance } = await shallow.render();
    const carousel = find('.carousel-item-list').nativeElement as HTMLElement;
    carousel.style.left = '80px';
    instance.onRight = false;
    instance.shift('right');
    expect(carousel.style.left).toBe('24px');
  });

  it('should not shift the carousel right if carousel is already at right end.', async () => {
    const { find, instance } = await shallow.render();
    const carousel = find('.carousel-item-list').nativeElement as HTMLElement;
    carousel.style.left = '-80px';
    instance.onRight = true;
    instance.shift('right');
    expect(carousel.style.left).toBe('-80px');
  });

  it('should not shift the carousel left if carousel is already at left end.', async () => {
    const { find, instance } = await shallow.render();
    const carousel = find('.carousel-item-list').nativeElement as HTMLElement;
    carousel.style.left = '0px';
    instance.onLeft = true;
    instance.shift('left');
    expect(carousel.style.left).toBe('0px');
  });

  it('should emit the organ name whenever selectOrgan is called.', async () => {
    const { instance, outputs } = await shallow.render();
    const testOrgan: OrganInfo = {name: 'test', src: 'test'};
    instance.selectOrgan(testOrgan);
    expect(outputs.organChanged.emit).toHaveBeenCalled();
  });

  it('should tell if an icon is selected.', async () => {
    const { instance } = await shallow.render();
    const testOrgan: OrganInfo = {name: 'test', src: 'test'};
    const testOrgan2: OrganInfo = {name: 'test2', src: 'test2'};
    instance.selectOrgan(testOrgan);
    expect(instance.isSelected(testOrgan)).toBeTrue();
    expect(instance.isSelected(testOrgan2)).toBeFalse();
  });

  it('should set the icon class to disabled if disabled is true', async () => {
    const testOrganList = [
      {name: 'A', src: 'A', disabled: true},
      {name: 'B', src: 'B'},
      {name: 'C', src: 'C'},
      {name: 'D', src: 'D'},
      {name: 'E', src: 'E'},
      {name: 'F', src: 'F'},
      {name: 'G', src: 'G'}
    ] as OrganInfo[];

    const { find } = await shallow.render({bind: {organList: testOrganList}});
    const disabled = find('.carousel-item')[0].nativeElement as HTMLElement;
    expect(disabled.className).toContain('disabled');
  });

  it('should scroll the carousel', async () => {
    const { instance } = await shallow.render();
    instance.scroll('left');
    expect(instance.timeoutHandler).toBeDefined();
  });

  it('should stop scrolling', async () => {
    const { instance } = await shallow.render();
    instance.scroll('left');
    instance.stopScroll();
    expect(instance.timeoutHandler).toBeUndefined();
  });

});
