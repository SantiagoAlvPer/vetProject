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
     // Escucha el estado de autenticación de Firebase
     this.afAuth.authState.subscribe(user => {
      this.isAuthenticatedSubject.next(!!user);  // Actualiza el estado con true si el usuario está autenticado
    });
  }

  async logInWithEmailAndPassword(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      // Actualiza isAuthenticatedSubject a true
      this.isAuthenticatedSubject.next(true);
      console.log('Authenticated user');
      this.router.navigate(['/home']);  // Redirige una vez que el usuario está autenticado
    } catch (error) {
      console.error('Error logging in', error);
      this.isAuthenticatedSubject.next(false);  
    }
  }

  async logOut(): Promise<void> {
    await this.afAuth.signOut();
    this.isAuthenticatedSubject.next(false);  // Actualiza el estado de autenticación
    this.router.navigate(['/login']);  // Redirige a la página de inicio de sesión
  }

  // Método para obtener el estado de autenticación actual
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
