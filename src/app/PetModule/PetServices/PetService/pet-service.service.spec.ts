import { TestBed } from '@angular/core/testing';

import { PetServiceService } from './pet-service.service';

describe('PetServiceService', () => {
  let service: PetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
