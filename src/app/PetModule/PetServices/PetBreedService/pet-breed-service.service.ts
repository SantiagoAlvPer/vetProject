import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PetBreedService {
  private breeds = {
    perro: [
      'Chihuahua',
      'Pomerania',
      'Yorkshire terrier',
      'Shih Tzu',
      'Bichón frisé',
      'Dachshund miniatura',
      'Pug',
      'Maltés',
      'Cavalier King Charles Spaniel',
      'Boston terrier',
      'Poodle toy',
      'Papillón'
    ],
    gato: [
      'Singapura',
      'Munchkin',
      'Cornish rex',
      'Devon rex',
      'American Curl',
      'Burmés',
      'Oriental de Pelo Corto',
      'Sphynx',
      'Scottish Fold',
      'Tonkinés',
      'Abisinio',
      'Selkirk rex'
    ],
  };

  getBreeds(type: 'perro' | 'gato'): string[] {
    return this.breeds[type] || [];
  }
}