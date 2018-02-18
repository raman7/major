import { TestBed, inject } from '@angular/core/testing';

import { QueServiceService } from './que-service.service';

describe('QueServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueServiceService]
    });
  });

  it('should be created', inject([QueServiceService], (service: QueServiceService) => {
    expect(service).toBeTruthy();
  }));
});
