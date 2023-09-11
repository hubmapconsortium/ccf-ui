import { Shallow } from 'shallow-render';
import { LinkCardsComponent } from './link-cards.component';
import { LinkCardsModule } from './link-cards.module';
describe('LinkCardsComponent', () => {
  let shallow: Shallow<LinkCardsComponent>;
  beforeEach(() => {
    shallow = new Shallow(LinkCardsComponent, LinkCardsModule);
  });
  it('should call window open function on click', async () => {
    const { instance } = await shallow.render();
    spyOn(window, 'open').and.callThrough();
    instance.goToURL('http://test.com');
    expect(window.open).toHaveBeenCalled();
  });
});
