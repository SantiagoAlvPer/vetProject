import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateVaccinePage } from './update-vaccine.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateVaccinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateVaccinePageRoutingModule {}
