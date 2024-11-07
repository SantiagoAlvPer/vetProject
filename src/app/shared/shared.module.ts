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

const Components = [
  InputComponent,
  CardComponent,
  ButtonComponent
];

const Modules = [
  CommonModule, 
  FormsModule,
  IonicModule,
  ReactiveFormsModule, 
  RouterLink
];

const Providers = [
  StorageService,
  AuthService,
  ];

@NgModule({
  declarations: [...Components],
  imports: [...Modules],
  providers: [...Providers],
  exports: [...Components, ...Modules],
})
export class SharedModule { }
