import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/interfaces/IUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public image!: FormControl;
  public name!: FormControl;
  public lastName!: FormControl;
  public age!: FormControl;
  public phone!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public birthDate!: FormControl;
  public signupForm!: FormGroup;

  constructor( private readonly authSvr: AuthService,
    
  ) { 

  }

  ngOnInit() {
    this.initForm();

  }
  onSubmit() {
    if (this.signupForm.valid) {
      const formValues = this.signupForm.value;
  
      // Crear un objeto de usuario con los datos del formulario
      const userData: IUser = {
        name: formValues.name,
        lastName: formValues.lastName,
        age: formValues.age,
        phone: formValues.phone,
        email: formValues.email,
        birthDate: formValues.birthDate,
        uid: '', // Este campo se completará con el UID generado por Firebase
        image: formValues.image, // Si tienes una imagen opcional
      };
  
      // Llamar al servicio de autenticación para registrar el usuario
      this.authSvr.doRegister(userData.email, 'yourPasswordHere', userData)
        .then(() => {
          console.log('Usuario registrado correctamente');
        })
        .catch((error) => {
          console.error('Error al registrar usuario', error);
        });
    } else {
      console.log('Formulario inválido');
    }
  }

  
  private initForm() {
    this.image = new FormControl('');
    this.birthDate = new FormControl('');
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
      birthDate: this.birthDate,
      image: this.image,
    });
  }

}
