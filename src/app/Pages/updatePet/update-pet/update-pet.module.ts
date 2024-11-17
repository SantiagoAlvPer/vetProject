import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePetPageRoutingModule } from './update-pet-routing.module';

import { UpdatePetPage } from './update-pet.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePetPageRoutingModule,
    SharedModule
],
  declarations: [UpdatePetPage]
})
export class UpdatePetPageModule {}
