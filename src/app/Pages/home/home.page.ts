import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { PetServiceService } from 'src/app/PetModule/PetServices/PetService/pet-service.service';
import { ModalComponent } from 'src/app/shared/components/modal/modal/modal.component';
import { LoadingService } from 'src/app/shared/controllers/loading/loading.service';
import { IPet } from 'src/app/shared/interfaces/IPet';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isAuthenticated: boolean = false;
  pets: IPet[] = [];
  
  constructor(
    private readonly authSrv: AuthService,
    private readonly modalCtrl: ModalController,
    private readonly loadingSrv: LoadingService, // Agregar LoadingService al constructor para mostrar loading en el modal
    private readonly petSvr: PetServiceService
  ) {

  }
  ngOnInit() {
    this.authSrv.isAuthenticated$.subscribe(authenticated => {
      this.isAuthenticated = authenticated;

    });
      // Obtener mascotas en tiempo real
  this.petSvr.getPetsByUser().subscribe((pets) => {
    this.pets = pets;
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
      this.loadingSrv.dismiss();
    }).catch(error => {
      this.loadingSrv.dismiss();
      console.error('Error al cerrar sesión:', error);
    });
  }
}