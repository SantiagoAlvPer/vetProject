import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { catchError, defaultIfEmpty, map, Observable, switchMap } from 'rxjs';
import { IPet } from 'src/app/shared/interfaces/IPet';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PetServiceService {


  constructor(
    private readonly firestore: AngularFirestore,
    private readonly authSvr: AuthService
  ) { }

  // Obtener una mascota por su ID
  getPet(petId: string): Observable<IPet | undefined> {
    return this.firestore.collection('pet').doc<IPet>(petId).valueChanges();
  }

  // Actualizar una mascota existente
  updatePet(petId: string, pet: IPet): Promise<void> {
    const userId = this.authSvr.getCurrentUserUID();
    return this.firestore
      .collection('pet')
      .doc(petId)
      .update({
        ...pet,
        petOwnerID: userId, // Aseguramos que el ownerID coincida con el del usuario actual
      });
  }
  // Método para obtener las mascotas del usuario autenticado en tiempo real
  getPetsByUser(): Observable<IPet[]> {
    return this.authSvr.getCurrentUserUID().pipe(
      switchMap(userId => {
        if (userId) {
          return this.firestore
            .collection<IPet>('pet', ref => ref.where('petOwnerID', '==', userId))
            .valueChanges();
        } else {
          // Si no hay usuario, devolver un observable vacío
          return new Observable<IPet[]>(subscriber => {
            subscriber.next([]);
            subscriber.complete();
          });
        }
      })
    );
  }


  addPet(pet: Omit<IPet, 'petID' | 'petOwnerID'>): void {
    this.authSvr.getCurrentUserUID().subscribe({
      next: (userId) => {
        if (userId) {
          const petData = {
            ...pet,
            petOwnerID: userId,
          };

          this.firestore.collection('pet').add(petData).then(docRef => {
            // Actualizar el documento con el campo `petID` (ID del documento)
            docRef.update({ petID: docRef.id }).then(() => {
              console.log('Mascota registrada y petID asignado:', docRef.id);
            }).catch(updateError => {
              console.error('Error al asignar petID:', updateError);
            });
          }).catch(addError => {
            console.error('Error al agregar la mascota:', addError);
          });
        } else {
          console.error('Usuario no autenticado, no se puede agregar la mascota');
        }
      },
      error: (error) => console.error('Error obteniendo el UID del usuario:', error),
    });
  }

  deletePet(petId: string): Promise<void> {
    return this.firestore
      .collection('pet')
      .doc(petId)
      .delete()
      .then(() => {
        console.log('Mascota eliminada:', petId);
      })
      .catch((error) => {
        console.error('Error al eliminar la mascota:', error);
        throw error;
      });
  }

}