import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PetBreedService } from 'src/app/PetModule/PetServices/PetBreedService/pet-breed-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isAuthenticated: boolean = false;
  
  constructor(
    private readonly authSrv: AuthService,
  ) {

  }
  ngOnInit() {
    this.authSrv.isAuthenticated$.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    });
  }
  

  public async LogOut() {
    this.authSrv.logOut().then(() => {
      // Redirige o navega después de cerrar sesión
      console.log('Sesión cerrada');
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }
}
