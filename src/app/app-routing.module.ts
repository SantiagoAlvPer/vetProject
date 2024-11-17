import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/guards/guard.guard';

const routes: Routes = [
  {
    path: 'home',
    // canActivate:[AuthGuard]
    loadChildren: () => import('./Pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./Pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'update-pet',
    loadChildren: () => import('./Pages/updatePet/update-pet/update-pet.module').then( m => m.UpdatePetPageModule)
  },
  {
    path: 'vaccine',
    loadChildren: () => import('./Pages/vaccine/vaccine.module').then( m => m.VaccinePageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
