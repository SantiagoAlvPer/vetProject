import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent  implements OnInit {

  @Input() name: string = 'Lulu';
  @Input() breed: string = 'Singapura';
  @Input() ege: number = 3;  
  @Input() birthDay: string = '2001-07-23';  
  @Input() photo: string = '';

  constructor(
    private readonly popoverCtrl : PopoverController,
    private router: Router
  ) { }

  ngOnInit() {}

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
      this.router.navigate(['/update-pet'], { queryParams: { name: pet.pet, description: pet.description } });
      console.log('Update task:', pet);
    } else if (option === 'delete') {

      console.log('Delete task:', pet);
    }
  }

}
