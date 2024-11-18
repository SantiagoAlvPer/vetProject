import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateVaccinePage } from './update-vaccine.page';

describe('UpdateVaccinePage', () => {
  let component: UpdateVaccinePage;
  let fixture: ComponentFixture<UpdateVaccinePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateVaccinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
