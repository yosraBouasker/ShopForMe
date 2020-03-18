import { TestBed } from '@angular/core/testing';

import { ApiContactService } from './api-contact.service';

describe('ApiContactService', () => {
  let service: ApiContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
