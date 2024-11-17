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
import { ToastService } from './controllers/toast/toast.service';
import { LocalNotificationsService } from './controllers/localNotificacions/local-notifications.service';
import { PetFormComponent } from '../PetModule/PetComponents/PetForm/pet-form/pet-form.component';
import { PetListComponent } from '../PetModule/PetComponents/PetList/pet-list/pet-list.component';
import { PetServiceService } from '../PetModule/PetServices/PetService/pet-service.service';
import { PetBreedService } from '../PetModule/PetServices/PetBreedService/pet-breed-service.service';
import { FormVacunasComponent } from './components/VacForm/vac-form.component';
import { VaccineService } from './services/Vaccine/vaccine.service';
import { LoadingService } from './controllers/loading/loading.service';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './components/modal/modal/modal.component';
import { AvatarComponent } from './components/avatar/avatar/avatar.component';

const Components = [
  InputComponent,
  CardComponent,
  ButtonComponent,
  PetFormComponent,
  PetListComponent,
  FormVacunasComponent,
  ModalComponent,
  AvatarComponent
];

const Modules = [
  CommonModule, 
  FormsModule,
  IonicModule,
  ReactiveFormsModule, 
  RouterLink,
  HttpClientModule
];

const Controllers = [ToastService, LocalNotificationsService, LoadingService]


const Providers = [
  StorageService,
  AuthService,
  PetServiceService,
  PetBreedService,
  VaccineService
  ];

@NgModule({
  declarations: [...Components],
  imports: [...Modules],
  providers: [...Providers, ...Controllers],
  exports: [...Components, ...Modules],
})
export class SharedModule { }