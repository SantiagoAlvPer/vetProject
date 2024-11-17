import { NgModule } from '@angular/core';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterPageModule } from '../register/register.module';


@NgModule({
  imports: [
    SharedModule,
    HomePageRoutingModule,
    RegisterPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
