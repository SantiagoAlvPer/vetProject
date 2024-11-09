import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  public loginForm: FormGroup;

  constructor(
    private readonly authSvr: AuthService,
    private readonly navCtrl: NavController
  ) {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit() {}

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.authSvr.logInWithEmailAndPassword(email, password); // Usamos el método login del servicio
        console.log('Inicio de sesión exitoso. Navegando a /home');
        this.navCtrl.navigateForward('home');
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    } else {
      console.log('Formulario no válido');
    }
  }
}
