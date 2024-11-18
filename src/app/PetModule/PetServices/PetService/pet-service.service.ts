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
  ) { }

  async getPetsByUser(): Promise<IPet[]> {
    try {
      // Obtener el UID del usuario autenticado
      const petOwnerID = await this.authSvr.getCurrentUserUID();
      if (!petOwnerID) {
        throw new Error('Usuario no autenticado');
      }
  
      // Realizar la consulta a Firestore
      const querySnapshot = await this.firestore
        .collection<IPet>('pet', ref => ref.where('petOwnerID', '==', petOwnerID))
        .get()
        .toPromise();
  
      // Verificar si `querySnapshot` es válido y procesar los documentos
      if (!querySnapshot || querySnapshot.empty) {
        console.warn('No se encontraron mascotas para el usuario.');
        return []; // Retorna un array vacío si no hay documentos
      }
  
      // Mapear los documentos a un array de IPet
      const pets: IPet[] = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        petID: doc.id, // Agregar el ID del documento como petID
      }));
  
      return pets;
    } catch (error) {
      console.error('Error al obtener las mascotas del usuario:', error);
      throw error;
    }
  }

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
      // Agregar el documento a Firestore y obtener su referencia
      const docRef = await this.firestore.collection('pet').add(petData);

      // Actualizar el documento con su ID (petID)
      await docRef.update({ petID: docRef.id });

      // Guardar la mascota en Firestore
      await this.firestore.collection('pet').add(petData);
      console.log('Mascota registrada con éxito');
    } catch (error) {
      console.error('Error al agregar la mascota:', error);
      throw error; // Lanza el error para que el componente lo maneje
    }
  }
}