import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePetPage } from './update-pet.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePetPageRoutingModule {}
