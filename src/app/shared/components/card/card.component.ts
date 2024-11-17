import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {}

}
