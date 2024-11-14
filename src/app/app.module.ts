import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormVacunasComponent } from './shared/components/VacForm/vac-form.component';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';




@NgModule({
<<<<<<< HEAD
  declarations: [AppComponent, FormVacunasComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CoreModule],
=======
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, CoreModule,ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFireAuthModule, AngularFirestoreModule
  ],
>>>>>>> 92a26f5364716836ca642205a09b63f5c804cb73
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
