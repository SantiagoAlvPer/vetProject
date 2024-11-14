import { TestBed } from '@angular/core/testing';

import { PetBreedServiceService } from './pet-breed-service.service';

describe('PetBreedServiceService', () => {
  let service: PetBreedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetBreedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
