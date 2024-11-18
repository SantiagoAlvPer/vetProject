import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { Router } from '@angular/router';
import { LoadingService } from '../../controllers/loading/loading.service';
import { PetServiceService } from 'src/app/PetModule/PetServices/PetService/pet-service.service';
import { IPet } from '../../interfaces/IPet';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {
  pets: IPet[] = [];

  @Input() name: string = '';
  @Input() breed: string = '';
  @Input() age: string = '';  
  @Input() birthDate: string = '';  
  @Input() image: string = '';

  constructor(
    private readonly popoverCtrl : PopoverController,
    private router: Router,
    private loadingSrv: LoadingService,
    private readonly petSvr: PetServiceService
  ) { }

  ngOnInit() {
    this.petSvr.getPetsByUser().subscribe((pets) => {
      this.pets = pets;
      });
  }

  async presentPopover(ev: Event) {  
    const pet = { pet: this.name, description: this.breed }; 
  
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      cssClass: 'style-Popover',
      event: ev,
      translucent: true,
      componentProps: {
        options: [
          { label: 'Update', value: 'update', icon: 'create' },
          { label: 'Delete', value: 'delete', icon: 'trash' }
        ],
        pet: pet 
      }
    });
  
    await popover.present();
  
    const { data } = await popover.onDidDismiss();  
    if (data) {
      this.handleOptionSelection(data.option, data.pet);  
    }
  }

  handleOptionSelection(option: string, pet: any) {
    if (option === 'update') {

      this.router.navigate(['/update-pet'], { 
        queryParams: { 
          name: pet.name, 
          breed: pet.breed,  // Asumiendo que el "description" es en realidad la raza
          age: pet.age,
          birthDate: pet.birthDate,
          image: pet.image
        }
      });

      console.log('Update task:', pet);
    } else if (option === 'delete') {
    
 
      //Logica delete o funcion delete
      console.log('Delete task:', pet);
    }
  }
}