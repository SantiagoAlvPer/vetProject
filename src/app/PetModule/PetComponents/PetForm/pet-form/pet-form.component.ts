import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PetServiceService } from 'src/app/PetModule/PetServices/PetService/pet-service.service';
import { CameraService } from 'src/app/PetModule/PetServices/Camera/camera.service';
import { IPet } from 'src/app/shared/interfaces/IPet';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { ToastService } from 'src/app/shared/controllers/toast/toast.service';
import { LocalNotificationsService } from 'src/app/shared/controllers/localNotificacions/local-notifications.service';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss'],
})
export class PetFormComponent implements OnInit {

  public pets: IPet[] = []; // Array para almacenar las mascotas
  public imageUrl: string | null = null; // Para mostrar la imagen seleccionada

  @Input() title: string = '';
  @Input() message: string = '';
  @Input() mode: 'register' | 'update' = 'register';
  public image!: FormControl;
  public name!: FormControl;
  public breed!: FormControl;
  public age!: FormControl;
  public birthDate!: FormControl;

  public petForm!: FormGroup;

  @Output() formValid = new EventEmitter<boolean>();
  @Output() formSubmit = new EventEmitter<any>();

  constructor(
    private readonly cameraSrv: CameraService,
    private readonly petSvr: PetServiceService,
    private readonly loadingSrv: LoadingService,
    private readonly toastSrv: ToastService,
    private readonly localNotisSrv: LocalNotificationsService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadPets();
  }

   // Cargar las mascotas del usuario
   public async loadPets() {
    try {
      this.pets = await this.petSvr.getPetsByUser();
      console.log('Mascotas cargadas:', this.pets);
    } catch (error) {
      console.error('Error al cargar las mascotas:', error);
    }
  }

  // Manejar el registro de la mascota
  public async registerPet() {
    if (this.petForm.valid) {
      try {
        this.loadingSrv.show('Logging in...');  
        await this.petSvr.addPet(this.petForm.value);
        this.localNotisSrv.showNotification(1, 'Bien!', 'Nueva mascota registrada!');
        this.toastSrv.showSuccess('Mascota registrada con éxito :)');
        this.petForm.reset(); // Reinicia el formulario después del registro
        this.loadingSrv.dismiss();
      } catch (error) {
        this.loadingSrv.dismiss();
        this.toastSrv.showError('Error al registrar la mascota:');
        console.error('Error al registrar la mascota:', error);
      }
    } else {
      this.loadingSrv.dismiss();
      this.toastSrv.showError('Formulario invalido.');
      console.error('Formulario inválido:', this.petForm.errors);
    }
  }

  // public async handleFormSubmit() {
  //   if (this.petForm.valid) {
  //     if (this.mode === 'register') {
  //       // await this.doRegister();
  //     } else if (this.mode === 'update') {
  //       // await this.doUpdate();
  //     }
  //   } else {
  //   }
  // }

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

  public setFormData(pet: any) {
    this.petForm.patchValue({
      image: pet.image || '',
      name: pet.name || '',
      breed: pet.breed || '',
      age: pet.age || '',
      birthDate: pet.birthDate || '',
    });
  }

  private initForm() {
    this.image = new FormControl('');
    this.age = new FormControl('', Validators.pattern('^[0-9]+$')); // Solo números
    this.name = new FormControl('', Validators.required);
    this.breed = new FormControl('', Validators.required);
    this.birthDate = new FormControl('2024-01-01', Validators.required);

    this.petForm = new FormGroup({
      name: this.name,
      breed: this.breed,
      age: this.age,
      birthDate: this.birthDate,
      image: this.image,
    });
  }
}