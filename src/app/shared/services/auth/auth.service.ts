import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    // Observa el estado de autenticación de Firebase
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticatedSubject.next(true);
      } else {
        this.isAuthenticatedSubject.next(false);
      }
    });
  }

  async logInWithEmailAndPassword(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Usuario autenticado');
      this.router.navigate(['/home']);  // Redirige una vez que el usuario está autenticado
    } catch (error) {
      console.error('Error al iniciar sesión', error);
    }
  }

  async logOut(): Promise<void> {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);  // Redirige a la página de login cuando el usuario se desconecta
  }
}
