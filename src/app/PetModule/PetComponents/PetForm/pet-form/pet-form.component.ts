import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CameraService } from 'src/app/PetModule/PetServices/Camera/camera.service';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss'],
})

export class PetFormComponent implements OnInit {

  public imageUrl: string | null = null; // Para mostrar la imagen seleccionada

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() mode: 'register' | 'update' = 'register';
  public image!: FormControl;
  public name!: FormControl;
  public breed!: FormControl;
  public birthDate!: FormControl;

  public petForm!: FormGroup;

  @Output() formValid = new EventEmitter<boolean>();
  @Output() formSubmit = new EventEmitter<any>();

  constructor(private readonly cameraSrv: CameraService) {}

  ngOnInit() {
    this.initForm();
  }

  public async handleFormSubmit() {
    if (this.petForm.valid) {
      if (this.mode === 'register') {   
        // await this.doRegister();
      } else if (this.mode === 'update') {
        // await this.doUpdate();
      }
    } else {
    }
  }

  public updateBreed(breed: string) {
    this.breed.setValue(breed);
    console.log('Breed updated:', this.breed.value);
  }

  async onCapturePhoto(source: 'camera' | 'gallery') {
    try {
      const image = await this.cameraSrv.capturePhoto(source);
      this.imageUrl = image; // Guarda la URL de la imagen para mostrarla
    } catch (error) {
      console.error('Error al capturar o seleccionar la foto:', error);
    }
  }
  
  private initForm() {
    this.image = new FormControl('');
    this.name = new FormControl('', [Validators.required]);
    this.breed = new FormControl('', [Validators.required]);
    this.birthDate = new FormControl('2024-01-01', [Validators.required]);

    this.petForm = new FormGroup({
      name: this.name,
      breed: this.breed,
      birthDate: this.birthDate,
      image: this.image
    });
  }
}