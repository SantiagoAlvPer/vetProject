import { Injectable } from '@angular/core';
import { Toast } from '@capacitor/toast';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  // Método para mostrar un toast en caso de éxito
  async showSuccess(message: string) {
    await Toast.show({
      text: `✅ ${message}`,   // Prefijo de emoji para representar éxito
      duration: 'short',
      position: 'bottom'
    });
  }

  // Método para mostrar un toast en caso de error
  async showError(message: string) {
    await Toast.show({
      text: `❌ ${message}`,   // Prefijo de emoji para representar error
      duration: 'short',
      position: 'bottom'
    });
  }
}