import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  static storage = (() => {
    // Slightly modified from https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    let storage: Storage | undefined;
    try {
      storage = window.localStorage;
      const x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);

      return storage;
    } catch (error) {
      const full = error instanceof DOMException && (
        // everything except Firefox
        error.code === 22 ||
        // Firefox
        error.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        error.name === 'QuotaExceededError' ||
        // Firefox
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
      ) && (storage && storage.length !== 0);

      return full ? storage : undefined;
    }
  })();

  get length(): number {
    return LocalStorageService.storage?.length ?? 0;
  }

  key(index: number): string | null {
    return LocalStorageService.storage?.key(index) ?? null;
  }

  getItem<D extends string | null = null>(key: string, defaultValue?: D): string | D {
    return LocalStorageService.storage?.getItem(key) ?? defaultValue ?? null as D;
  }

  setItem(key: string, value: string): boolean {
    try {
      LocalStorageService.storage?.setItem(key, value);
      return true;
    } catch (_error) {
      return false;
    }
  }

  removeItem(key: string): void {
    LocalStorageService.storage?.removeItem(key);
  }

  clear(): void {
    LocalStorageService.storage?.clear();
  }
}
