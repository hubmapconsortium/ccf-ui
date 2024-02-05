import { GlobalsService } from 'ccf-shared';
import { globalConfigFactory } from './config';


describe('GlobalConfig', () => {
  describe('globalConfigFactory', () => {
    it('fetches the ruiConfig object from the global object', () => {
      const spyObj = jasmine.createSpyObj<GlobalsService>('GlobalsService', ['get']);
      globalConfigFactory(spyObj);
      expect(spyObj.get).toHaveBeenCalledWith('ruiConfig', jasmine.anything());
    });
  });
});
