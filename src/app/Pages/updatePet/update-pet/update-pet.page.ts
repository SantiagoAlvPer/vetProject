import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPet } from 'src/app/shared/interfaces/IPet';
import { PetServiceService } from 'src/app/PetModule/PetServices/PetService/pet-service.service';

@Component({
  selector: 'app-update-pet',
  templateUrl: './update-pet.page.html',
  styleUrls: ['./update-pet.page.scss'],
})
export class UpdatePetPage implements OnInit {
  pet: IPet | null = null; // Almacena los datos de la mascota

  constructor(
    private route: ActivatedRoute,
    private petSvr: PetServiceService
  ) {}

  ngOnInit() {
    // Obtenemos el ID desde la URL
    const petId = this.route.snapshot.paramMap.get('id');
    if (petId) {
      // Cargar los datos de Firestore
      this.petSvr.getPet(petId).subscribe({
        next: (data) => {
          this.pet = data || null;
          console.log('Pet data loaded:', this.pet);
        },
        error: (err) => console.error('Error fetching pet data:', err),
      });
    }
  }
}