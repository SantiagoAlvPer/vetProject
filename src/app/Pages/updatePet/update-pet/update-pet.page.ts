import { PetServiceService } from 'src/app/PetModule/PetServices/PetService/pet-service.service';
import { Component, Input, OnInit } from '@angular/core';
import { IPet } from 'src/app/shared/interfaces/IPet';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-pet',
  templateUrl: './update-pet.page.html',
  styleUrls: ['./update-pet.page.scss'],
})
export class UpdatePetPage implements OnInit {
  pets: IPet[] = [];

  @Input() petId: string = ''; // Agregamos el ID de la mascota
  @Input() name: string = '';
  @Input() breed: string = '';
  @Input() age: string = '';  
  @Input() birthDate: string = '';  
  @Input() image: string = '';
  constructor(
    private readonly petSvr: PetServiceService, 
    private toastController: ToastController, // Inyectamos ToastController
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
   
  }

}
