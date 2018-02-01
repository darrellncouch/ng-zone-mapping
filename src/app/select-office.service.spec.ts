import { TestBed, inject } from '@angular/core/testing';

import { SelectOfficeService } from './select-office.service';

describe('SelectOfficeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectOfficeService]
    });
  });

  it('should be created', inject([SelectOfficeService], (service: SelectOfficeService) => {
    expect(service).toBeTruthy();
  }));
});
