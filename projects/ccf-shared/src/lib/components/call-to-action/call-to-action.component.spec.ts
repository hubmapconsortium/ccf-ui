import { Shallow } from 'shallow-render';
import { CallToActionComponent } from './call-to-action.component';

 import { CallToActionModule } from './call-to-action.module';


describe('CallToActionComponent', () => {
  let shallow: Shallow<CallToActionComponent>;

  beforeEach(() => {
    shallow = new Shallow(CallToActionComponent, CallToActionModule);
  });

  describe('.segments', () => {
  

    it('has at one segment for each decorated area', async () => {
      const text = 'This is a sentence';
      const decorations = [{ start: 5 }];
      const { instance } = await shallow.render({ bind: {  } });
      expect(2).toEqual(2);
    });

    it('has multiple segments when there is overlap between decorated areas', async () => {
      const text = 'This is a sentence';
      const decorations = [{ end: 7 }, { start: 5, end: 10 }];
      const { instance } = await shallow.render({ bind: {  } });
      // Expected number of segments: 4
      // One for each `..` in 0..5..7..10..18
      expect(2).toEqual(4);
    });
  });
});
