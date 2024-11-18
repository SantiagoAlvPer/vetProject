import { Injectable } from '@angular/core';
import { IVaccine } from '../../interfaces/IVaccine';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  private petVaccine: Map<string, IVaccine[]> = new Map();

  //almacena en un array basado en la interface
  private vaccines: IVaccine[] = [];

  constructor() { }

  //añade vacuna al array
  createVaccine(petId: string, vaccines: IVaccine): void{
    if(!this.petVaccine.has(petId)){
      this.petVaccine.set(petId, []);
    }
    this.petVaccine.get(petId)?.push(vaccines);
  }

  //devuelve vacunas almacenadas
  getVaccines(petId: string): IVaccine[]{
    return this.petVaccine.get(petId) || [];
  }

  //actualiza una vacuna en el array solo si existe, sino devuelve False
  updateVaccine(petId: string, index: number, updatedVaccine: IVaccine): boolean {
    const vaccines = this.petVaccine.get(petId);
    if (vaccines && index >= 0 && index < vaccines.length) {
      vaccines[index] = updatedVaccine;
      return true;
    }
    return false;
  }

  //usa el indice para eliminar vacuna, si indice no es valido o no existe, devuelve False
  deleteVaccine(petId: string, index: number): boolean {
    const vaccines = this.petVaccine.get(petId);
    if (vaccines && index >= 0 && index < vaccines.length) {
      vaccines.splice(index, 1);
      return true;
    }
    return false;
  }
}
