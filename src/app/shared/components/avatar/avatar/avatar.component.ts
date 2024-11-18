import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CameraService } from 'src/app/PetModule/PetServices/Camera/camera.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  protected defaultImage = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  protected mimeType = 'image/jpeg';

  @Input() control = new FormControl('');
  @Input() onlyView = false;
  @Input() imageUrl: string = '';

  @Output() imageUploaded = new EventEmitter<string>();

  constructor(private readonly cameraSrv: CameraService) {}

  ngOnInit() {
    // Cargar imagen preexistente si está disponible
    if (this.imageUrl) {
      this.control.setValue(this.imageUrl);
    } else {
      this.imageUrl = this.defaultImage;
    }
  }

  /**
   * Método para tomar o seleccionar una foto.
   * @param source Origen de la imagen: 'camera' o 'gallery'.
   */
  async onSelectPhoto(source: 'camera' | 'gallery') {
    try {
      const photo = await this.cameraSrv.capturePhoto(source);
      this.imageUrl = photo; // Actualiza la vista previa
      this.control.setValue(photo); // Vincula la imagen al control del formulario
      this.imageUploaded.emit(photo); // Emite el evento al padre
    } catch (error) {
      console.error('Error al seleccionar la foto:', error);
    }
  }
}