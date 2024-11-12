import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class LocalNotificationsService {

  constructor() {
    this.requestPermissions();
  }

  private async requestPermissions() {
    const permStatus = await LocalNotifications.requestPermissions();
    if (permStatus.display !== 'granted') {
      console.warn('Permission not granted for local notifications');
    }
  }

  async showNotification(id: number, title: string, body: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          id,
          title,
          body,
          schedule: { at: new Date(Date.now() + 1000 * 5) }, // 5 segundos después
          sound: 'beep.aiff', // Personaliza el sonido
          smallIcon: 'ic_launcher',
          actionTypeId: '',
        }
      ]
    });
  }

  // Limpiar notificaciones pendientes
  async clearAllNotifications() {
    await LocalNotifications.cancel({ notifications: [] });
  }
}

// // Example usage in HomePage.page.ts (Angular)

// import { Component } from '@angular/core';
// import { LocalNotificationsService } from '../services/local-notifications.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.page.html',
//   styleUrls: ['./home.page.scss'],
// })
// export class HomePage {
//   constructor(private localNotificationsService: LocalNotificationsService) {}

//   notifyNow() {
//     this.localNotificationsService.showNotification(1, '¡Hola!', 'Esta es una notificación de prueba');
//   }

// Example with html

// <ion-button (click)="notifyNow()">Notificación inmediata</ion-button>

