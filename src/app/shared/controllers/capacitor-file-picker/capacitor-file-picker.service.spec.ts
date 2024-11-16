import { TestBed } from '@angular/core/testing';

import { CapacitorFilePickerService } from './capacitor-file-picker.service';

describe('CapacitorFilePickerService', () => {
  let service: CapacitorFilePickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacitorFilePickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
