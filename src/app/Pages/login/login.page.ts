import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { LocalNotificationsService } from 'src/app/shared/controllers/localNotificacions/local-notifications.service';
import { ToastService } from 'src/app/shared/controllers/toast/toast.service';
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
    private readonly navCtrl: NavController,
    private readonly loadingSrv: LoadingService,
    private readonly toastSrv: ToastService
  ) {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  ngOnInit() {}

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.loadingSrv.show('Logging in...');  
      const { email, password } = this.loginForm.value;
      try {
        await this.authSvr.logInWithEmailAndPassword(email, password); 
        this.toastSrv.showSuccess('Bienvenido!');
        this.navCtrl.navigateForward('home');
        this.loadingSrv.dismiss();
      } catch (error) {
        this.toastSrv.showSuccess('Error en inicio de sesión :c');
        console.error('Error logging in:', error);
      }
    } else {
      console.log('Invalid form');
      this.loadingSrv.dismiss();
    }
  }
}