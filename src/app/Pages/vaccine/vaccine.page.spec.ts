import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VaccinePage } from './vaccine.page';

describe('VaccinePage', () => {
  let component: VaccinePage;
  let fixture: ComponentFixture<VaccinePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
