import { Injectable } from '@angular/core';
import { IVaccine } from '../../interfaces/IVaccine';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  //almacena en un array basado en la interface
  private vaccines: IVaccine[] = [];

  constructor() { }

  //añade vacuna al array
  createVaccine(vaccines: IVaccine): void{
    this.vaccines.push(vaccines);
  }

  //devuelve vacunas almacenadas
  getVaccines(): IVaccine[]{
    return this.vaccines;
  }

  //actualiza una vacuna en el array solo si existe, sino devuelve False
  updateVaccine(updatedVaccine: IVaccine, index: number): boolean {
    if(index >= 0 && index < this.vaccines.length){
      this.vaccines[index] = updatedVaccine;
      return true;
    }
    return false;
  }

  //usa el indice para eliminar vacuna, si indice no es valido o no existe, devuelve False
  deleteVaccine(index: number): boolean {
    if(index >= 0 && index < this.vaccines.length){
      this.vaccines.splice(index, 1); //metodo splice elimina o reemplaza contenido en un array
      return true;
    }
    return false;
  }
}
