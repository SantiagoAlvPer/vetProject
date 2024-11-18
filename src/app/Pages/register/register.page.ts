import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/interfaces/IUser';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { LocalNotificationsService } from 'src/app/shared/controllers/localNotificacions/local-notifications.service';
import { ToastService } from 'src/app/shared/controllers/toast/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public imageUrl: string | null = null; // Para mostrar la imagen seleccionada

  public image!: FormControl;
  public name!: FormControl;
  public lastName!: FormControl;
  public age!: FormControl;
  public phone!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public signupForm!: FormGroup;

  constructor(
    private readonly authSvr: AuthService,
    private readonly router: Router, // Inyectar Router
    private readonly loadingSrv: LoadingService, // Inyectar LoadingService
    private readonly localnotiSrv: LocalNotificationsService,
    private readonly toastSrv: ToastService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      this.loadingSrv.show('Logging in...');  
      const formValues = this.signupForm.value;

      // Crear un objeto de usuario SIN la contraseña
      const userData: IUser = {
        name: formValues.name,
        lastName: formValues.lastName,
        age: formValues.age,
        phone: formValues.phone,
        email: formValues.email,
        uid: '', // Este campo será completado por el servicio de autenticación
        image: formValues.image || null, // Si tienes una imagen opcional
      };

      try {
        // Registrar usuario con Firebase Authentication y almacenar datos en Firestore
        await this.authSvr.doRegister(
          formValues.email,
          formValues.password,
          userData
        );
        console.log('Usuario registrado correctamente');
        await this.router.navigate(['/login']);
        this.loadingSrv.dismiss();
        this.toastSrv.showSuccess('Te has registrado correctamente!');
        this.localnotiSrv.showNotification(1, '¡Hola!', 'Gracias por registrarte!');
      } catch (error) {
        this.loadingSrv.dismiss();
        this.toastSrv.showError('Algo va mal...');
        console.error('Error al registrar usuario:', error);
        // Manejo de errores comunes
      }
    } else {
      this.loadingSrv.dismiss();
      this.toastSrv.showError('Formulario inválido. Por favor, revise los datos.');
    }
  }

  onImageUploaded(imageUrl: string) {
    this.signupForm.get('image')?.setValue(imageUrl);
  }

  private initForm() {
    this.image = new FormControl('');
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);
    this.name = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.age = new FormControl('', [Validators.required]);
    this.phone = new FormControl('', [Validators.required]);

    this.signupForm = new FormGroup({
      name: this.name,
      lastName: this.lastName,
      age: this.age,
      phone: this.phone,
      email: this.email,
      password: this.password,
      image: this.image,
    });
  }
}