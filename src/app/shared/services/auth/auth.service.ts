import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
  
  async logInWithEmailAndPassword(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.isAuthenticatedSubject.next(true);
      console.log('Authenticated user');
  
      // Verifica si la ruta actual es diferente a '/home' antes de redirigir
      if (this.router.url !== '/home') {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error logging in', error);
      this.isAuthenticatedSubject.next(false);
    }
  }

    // Método para registrar un usuario en Firebase Authentication y guardar datos en Firestore
   // Método de registro
   async doRegister(email: string, password: string, userData: IUser): Promise<void> {
    try {
      console.log('Iniciando registro de usuario');
  
      // Crear el usuario en Firebase Authentication
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log('Usuario autenticado con éxito', userCredential);
  
      // Obtener el UID del usuario creado
      const uid = userCredential.user?.uid;

      if (uid) {
        const userDocData: IUser = {
          ...userData,
          uid: uid
        };
  
        // Guardar los datos en Firestore
        await this.fireStore.collection("IUser").doc(uid).set(userDocData);
        console.log('Datos del usuario guardados en Firestore');
        
        // Redirigir al usuario al login después de un registro exitoso
        await this.router.navigate(['/login']);
        console.log('Redirigiendo al login');
      }
    } catch (error) {
      console.error('Error en el registro de usuario:', error);
      throw error;
    }
  }

  async logOut(): Promise<void> {
    await this.afAuth.signOut();
    this.isAuthenticatedSubject.next(false);
    
    // Verifica si la ruta actual es diferente a '/login' antes de redirigir
    if (this.router.url !== '/login') {
      this.router.navigate(['/login']);
    }
  }
 
}
