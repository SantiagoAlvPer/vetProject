import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  async setPermission(key: string, value: boolean): Promise<void> {
    try {
      await Preferences.set({ key, value: JSON.stringify(value) });
    } catch (error) {
      console.error('Error al guardar el permiso:', error);
    }
  }

  async getPermission(key: string): Promise<boolean> {
    try {
      const { value } = await Preferences.get({ key });
      return value ? JSON.parse(value) : false;
    } catch (error) {
      console.error('Error al obtener el permiso:', error);
      return false;
    }
  }
}