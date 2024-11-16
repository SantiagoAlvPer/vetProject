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

  // Agregar una mascota
  async addPet(pet: Omit<IPet, 'petID' | 'petOwnerID'>): Promise<void> {
    const currentUser = await this.authSvr.getCurrentUser();
    if (!currentUser) {
      throw new Error('Usuario no autenticado');
    }

    const petOwnerID = currentUser.uid; // Obtener el UID del usuario autenticado

    // Agregar la mascota a Firestore (ID generado automáticamente)
    await this.firestore
      .collection('IUSer')
      .doc(petOwnerID)
      .collection('pet')
      .add({
        ...pet,
        petOwnerID, // Asociar el ID del propietario
      });
  }
}