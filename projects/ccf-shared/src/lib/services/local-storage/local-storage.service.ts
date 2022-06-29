import { Injectable } from '@angular/core';


/**
 * Service to handle local storage
 */
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

  /**
   * gets length of storage list
   */
  get length(): number {
    return LocalStorageService.storage?.length ?? 0;
  }

  /**
   * Gets value based on key index
   * @param index
   * @returns
   */
  key(index: number): string | null {
    return LocalStorageService.storage?.key(index) ?? null;
  }

  /**
   * Gets value based on key, also returns default if it fails
   * @param key
   * @param defaultValue
   * @returns the value
   */
  getItem<D extends string | null = null>(key: string, defaultValue?: D): string | D {
    return LocalStorageService.storage?.getItem(key) ?? defaultValue ?? null as D;
  }

  /**
   * sets a key-value pairin local storage
   * @param key
   * @param value
   * @returns true or false based on success/failure
   */
  setItem(key: string, value: string): boolean {
    try {
      LocalStorageService.storage?.setItem(key, value);
      return true;
    } catch (_error) {
      return false;
    }
  }

  /**
   * removes value based on key
   * @param key
   */
  removeItem(key: string): void {
    LocalStorageService.storage?.removeItem(key);
  }

  /**
   * Clears all storage
   */
  clear(): void {
    LocalStorageService.storage?.clear();
  }
}
