import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ModalComponent } from 'src/app/shared/components/modal/modal/modal.component';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isAuthenticated: boolean = false;
  
  constructor(
    private readonly authSrv: AuthService,
    private readonly modalCtrl: ModalController,
    private readonly loadingSrv: LoadingService  // Agregar LoadingService al constructor para mostrar loading en el modal
  ) {

  }
  ngOnInit() {
    this.authSrv.isAuthenticated$.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
  }

  async openSettingsModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      cssClass: 'settings-modal',
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data === 'updateProfile') {
      // this.goToUpdateProfile();
    } else if (data === 'logOut') {
      this.LogOut();
    }
  }

  public async LogOut() {
    this.loadingSrv.show('Logging in...');  
    this.authSrv.logOut().then(() => {
      // Redirige o navega después de cerrar sesión
      console.log('Sesión cerrada');
    }).catch(error => {
      this.loadingSrv.dismiss();
      console.error('Error al cerrar sesión:', error);
    });
  }
}