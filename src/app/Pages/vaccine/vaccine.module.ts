import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaccinePageRoutingModule } from './vaccine-routing.module';

import { VaccinePage } from './vaccine.page';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaccinePageRoutingModule,
    SharedModule
],
  declarations: [VaccinePage]
})
export class VaccinePageModule {}
