import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IPet } from 'src/app/shared/interfaces/IPet';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PetServiceService {

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly authSvr: AuthService
  ) {}

  async addPet(pet: Omit<IPet, 'petID' | 'petOwnerID'>): Promise<void> {
    try {
      // Obtener el UID del usuario autenticado
      const petOwnerID = await this.authSvr.getCurrentUserUID();
      if (!petOwnerID) {
        throw new Error('Usuario no autenticado');
      }

      // Agregar la mascota con el petOwnerID (Firestore generará el petID automáticamente)
      const petData = {
        ...pet,
        petOwnerID, // Asocia el propietario a la mascota con el UID del usuario autenticado
      };

      // Guardar la mascota en Firestore
      await this.firestore.collection('pet').add(petData);
      console.log('Mascota registrada con éxito');
    } catch (error) {
      console.error('Error al agregar la mascota:', error);
      throw error; // Lanza el error para que el componente lo maneje
    }
  }
}