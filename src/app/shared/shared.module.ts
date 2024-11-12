import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { CardComponent } from './components/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth.service';
import { ButtonComponent } from './components/button/button.component';
import { PetFormComponent } from './components/PetForm/pet-form/pet-form.component';
import { PetServiceService } from './services/PetService/pet-service.service';
import { PetListComponent } from './components/PetList/pet-list/pet-list.component';
import { PetBreedService } from './services/PetBreedService/pet-breed-service.service';
import { ToastService } from './controllers/toast/toast.service';
import { LocalNotificationsService } from './controllers/localNotificacions/local-notifications.service';

const Components = [
  InputComponent,
  CardComponent,
  ButtonComponent,
  PetFormComponent,
  PetListComponent
];

const Modules = [
  CommonModule, 
  FormsModule,
  IonicModule,
  ReactiveFormsModule, 
  RouterLink
];

const Controllers = [ToastService, LocalNotificationsService]


const Providers = [
  StorageService,
  AuthService,
  PetServiceService,
  PetBreedService
  ];

@NgModule({
  declarations: [...Components],
  imports: [...Modules],
  providers: [...Providers, ...Controllers],
  exports: [...Components, ...Modules],
})
export class SharedModule { }