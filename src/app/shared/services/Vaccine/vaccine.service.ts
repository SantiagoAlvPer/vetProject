import { Injectable } from '@angular/core';
import { IVaccine } from '../../interfaces/IVaccine';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {


  //almacena en un array basado en la interface
  private vaccines: IVaccine[] = [];

  constructor(private readonly fb: AngularFirestore, private readonly auth: AngularFireAuth) { }

  //añade vacuna por ID de pet
  async addVaccine(petId: string, data: IVaccine): Promise<void> {
    const id = this.fb.createId(); 
    data.idVaccine = id; 
    return this.fb.collection(`pet/${petId}/vaccine`).doc(id).set(data);
  }

  //devuelve todas las vacunas de un pet
  getVaccines(petId: string) {
    return this.fb.collection<IVaccine>(`pet/${petId}/vaccine`).valueChanges({ idField: 'id' });
  }

  //actualiza una vacuna por Id de pet e Id de Vaccine
  updateVaccine(petId: string, vaccineId: string, data: Partial<IVaccine>): Promise<void> {
    return this.fb.collection(`pet/${petId}/vaccine`).doc(vaccineId).update(data);
  }

  //elimina vacuna por Id de pet e Id de Vaccine
  deleteVaccine(petId: string, vaccineId: string): Promise<void> {
    return this.fb.collection(`pet/${petId}/vaccine`).doc(vaccineId).delete();
  } 
    
  
}
