import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  /**
   * Toma una foto con la cámara o selecciona una imagen desde la galería.
   * @param source Origen de la imagen: 'camera' o 'gallery'.
   * @returns Promesa con la URL de la imagen capturada o seleccionada.
   */
  async capturePhoto(source: 'camera' | 'gallery'): Promise<string> {
    try {
      // Define la fuente de la imagen: cámara o galería
      const cameraSource = source === 'camera' ? CameraSource.Camera : CameraSource.Photos;

      // Captura o selecciona la imagen
      const photo = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl, // La imagen se retorna como DataURL (base64)
        source: cameraSource,
      });

      if (!photo.dataUrl) {
        throw new Error('No se obtuvo ninguna imagen.');
      }

      // Retorna la imagen como una cadena base64
      return photo.dataUrl;
    } catch (error) {
      console.error('Error al capturar la foto:', error);
      throw error;
    }
  }
}