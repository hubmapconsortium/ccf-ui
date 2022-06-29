
import { LocalStorageService } from './local-storage.service';


describe('LocalStorageService', () => {
  let storageSpy: jasmine.SpyObj<Storage>;
  let ls: LocalStorageService;

  describe('with storage', () => {
    beforeEach(() => {
      storageSpy = jasmine.createSpyObj<Storage>(
        ['key', 'getItem', 'setItem', 'removeItem', 'clear'],
        { length: 0 }
      );
      ls = new LocalStorageService();
      LocalStorageService.storage = storageSpy;
    });

    it('should return length', async () => {
      if (Object.getOwnPropertyDescriptor(storageSpy, 'length')){
        const lengthSpy = Object.getOwnPropertyDescriptor(storageSpy, 'length')!.get;
        ls.length;
        expect(lengthSpy).toHaveBeenCalled();
      }
    });

    it('should get proper key at index 0', async () => {
      ls.key(0);
      expect(storageSpy.key).toHaveBeenCalled();
    });

    it('should retrieve value with key from stroage', async () => {
      ls.getItem('TestKey');
      expect(storageSpy.getItem).toHaveBeenCalled();
    });

    it('should remove item from storage', async () => {
      ls.removeItem('');
      expect(storageSpy.removeItem).toHaveBeenCalled();
    });

    it('should clear all storage', async () => {
      ls.clear();
      expect(storageSpy.clear).toHaveBeenCalled();
    });

    it('should return false at failed setItem call', async () => {
      storageSpy.setItem.and.throwError('Error, no storage');
      expect(ls.setItem('key', 'value')).toBeFalse();
    });
  });

  describe('with no storage', () => {
    beforeEach(() => {
      storageSpy = jasmine.createSpyObj<Storage>(
        ['key', 'getItem', 'setItem', 'removeItem', 'clear'],
        { length: 0 }
      );
      ls = new LocalStorageService();
      LocalStorageService.storage = undefined;
    });

    it('should return default for get item', async () => {
      expect(ls.getItem('key', 'Crabs')).toEqual('Crabs');
    });

    it('should return default(null) for key', async () => {
      expect(ls.key(0)).toEqual(null);
    });
  });
});
