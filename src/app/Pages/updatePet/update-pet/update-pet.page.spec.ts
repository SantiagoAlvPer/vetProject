import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdatePetPage } from './update-pet.page';

describe('UpdatePetPage', () => {
  let component: UpdatePetPage;
  let fixture: ComponentFixture<UpdatePetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
