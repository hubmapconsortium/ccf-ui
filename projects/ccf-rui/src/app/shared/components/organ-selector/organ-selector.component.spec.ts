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
    instance.shift('left', 40);
    expect(carousel.style.left).toBe('120px');
  });

  it('should shift the carousel right if dir === right.', async () => {
    const { find, instance } = await shallow.render();
    const carousel = find('.carousel-item-list').nativeElement as HTMLElement;
    carousel.style.left = '80px';
    instance.shift('right', 40);
    expect(carousel.style.left).toBe('40px');
  });

  it('should not shift the carousel right if carousel is already at right end.', async () => {
    const { find, instance } = await shallow.render();
    const carousel = find('.carousel-item-list').nativeElement as HTMLElement;
    const testOrganList = [
      {name: 'A', url: 'A'},
      {name: 'B', url: 'B'},
      {name: 'C', url: 'C'},
      {name: 'D', url: 'D'},
      {name: 'E', url: 'E'},
      {name: 'F', url: 'F'},
      {name: 'G', url: 'G'},
    ] as OrganInfo[];
    instance.organList = testOrganList;
    carousel.style.left = '-80px';
    instance.shift('right', 40);
    expect(carousel.style.left).toBe('-80px');
  });

  it('should not shift the carousel left if carousel is already at left end.', async () => {
    const { find, instance } = await shallow.render();
    const carousel = find('.carousel-item-list').nativeElement as HTMLElement;
    const testOrganList = [
      {name: 'A', url: 'A'},
      {name: 'B', url: 'B'},
      {name: 'C', url: 'C'},
      {name: 'D', url: 'D'},
      {name: 'E', url: 'E'},
      {name: 'F', url: 'F'},
      {name: 'G', url: 'G'},
    ] as OrganInfo[];
    instance.organList = testOrganList;
    carousel.style.left = '0px';
    instance.shift('left', 40);
    expect(carousel.style.left).toBe('0px');
  });

  it('should emit the organ name whenever selectOrgan is called.', async () => {
    const { instance, outputs } = await shallow.render();
    const testOrgan: OrganInfo = {name: 'test', url: 'test'};
    instance.selectOrgan(testOrgan);
    expect(outputs.organChanged.emit).toHaveBeenCalled();
  });

  it('should tell if an icon is selected.', async () => {
    const { instance } = await shallow.render();
    const testOrgan: OrganInfo = {name: 'test', url: 'test'};
    const testOrgan2: OrganInfo = {name: 'test2', url: 'test2'};
    instance.selectOrgan(testOrgan);
    expect(instance.isSelected(testOrgan)).toBeTrue();
    expect(instance.isSelected(testOrgan2)).toBeFalse();
  });

});
