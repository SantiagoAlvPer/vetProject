import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IUser } from '../../interfaces/IUser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly fireStore: AngularFirestore,
    private router: Router
  ) {
     // Escucha el estado de autenticación de Firebase
     this.afAuth.authState.subscribe(user => {
      this.isAuthenticatedSubject.next(!!user);  // Actualiza el estado con true si el usuario está autenticado
    });
  }
 // Método para obtener el estado de autenticación actual
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
  
    // Obtener el usuario autenticado
    async getCurrentUser(): Promise<firebase.default.User | null> {
      try {
        const user = await this.afAuth.currentUser;
        return user;
      } catch (error) {
        console.error('Error obteniendo el usuario autenticado:', error);
        return null;
      }
    }
  
    // Obtener el UID del usuario autenticado
    getCurrentUserUID(): Observable<string | null> {
      return this.afAuth.authState.pipe(
        map(user => user ? user.uid : null) // Devuelve el UID si el usuario está autenticado, o null
      );
    }

  // Iniciar sesión con correo y contraseña
  async logInWithEmailAndPassword(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.isAuthenticatedSubject.next(true);
      console.log('Usuario autenticado con éxito');

      // Redirigir a home si no está ya en esa ruta
      if (this.router.url !== '/home') {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.isAuthenticatedSubject.next(false);
      throw error; // Lanza el error para manejarlo en el componente si es necesario
    }
  }

  // Registrar un nuevo usuario
  async doRegister(email: string, password: string, userData: IUser): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(
      async (userCredential) => {
        const uid = userCredential.user?.uid;
        if (uid) {
          userData.uid = uid;
          await this.fireStore.collection('IUser').doc(uid).set(userData);
        }
      }
    );
  }
  

  // Cerrar sesión
  async logOut(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.isAuthenticatedSubject.next(false);
      console.log('Sesión cerrada');

      // Redirigir a login si no está ya en esa ruta
      if (this.router.url !== '/login') {
        this.router.navigate(['/login']);
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
