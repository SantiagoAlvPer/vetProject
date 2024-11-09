import { Component, OnInit } from '@angular/core';
import { PetBreedService } from 'src/app/shared/services/PetBreedService/pet-breed-service.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit {
  breeds: string[] = [];
  petType: 'perro' | 'gato' = 'perro';

  constructor(private petBreedSrv: PetBreedService) {}

  ngOnInit() {
    this.loadBreeds(this.petType);
  }

  onPetTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement; // Casting seguro a HTMLSelectElement
    this.petType = selectElement.value as 'perro' | 'gato';
    this.loadBreeds(this.petType);
  }

  private loadBreeds(type: 'perro' | 'gato') {
    this.breeds = this.petBreedSrv.getBreeds(type);
  }
}