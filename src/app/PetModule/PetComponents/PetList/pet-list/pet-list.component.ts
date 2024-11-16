import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PetBreedService } from 'src/app/PetModule/PetServices/PetBreedService/pet-breed-service.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit {
  @Output() breedSelected = new EventEmitter<string>();
  breeds: string[] = [];
  petType: 'perro' | 'gato' = 'perro';

  constructor(private petBreedSrv: PetBreedService) {}

  ngOnInit() {
    this.loadBreeds(this.petType);
  }

  onPetTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.petType = selectElement.value as 'perro' | 'gato';
    this.loadBreeds(this.petType);
  }

  onBreedChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.breedSelected.emit(selectElement.value);
  }

  private loadBreeds(type: 'perro' | 'gato') {
    this.breeds = this.petBreedSrv.getBreeds(type);
  }
}