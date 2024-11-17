import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { LocalStorageService } from 'src/app/shared/services/localstorage/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private readonly localstrgSrv: LocalStorageService) { }

  /**
   * Toma una foto con la cámara o selecciona una imagen desde la galería.
   * @param source Origen de la imagen: 'camera' o 'gallery'.
   * @returns Promesa con la URL de la imagen capturada o seleccionada.
   */
  async capturePhoto(source: 'camera' | 'gallery'): Promise<string> {
    try {
      const hasPermission = await this.localstrgSrv.getPermission('camera');
      if (!hasPermission) {
        throw new Error('No se ha otorgado permiso para usar la cámara.');
      }

      const cameraSource = source === 'camera' ? CameraSource.Camera : CameraSource.Photos;
      const photo = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: cameraSource,
      });

      if (!photo.dataUrl) {
        throw new Error('No se obtuvo ninguna imagen.');
      }
      return photo.dataUrl;
    } catch (error) {
      console.error('Error al capturar la foto:', error);
      throw error;
    }
  }
}