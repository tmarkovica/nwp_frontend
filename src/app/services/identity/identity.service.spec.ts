import { TestBed } from '@angular/core/testing';

import { IdentityService } from './identity.service';

describe('AccountService', () => {
  let service: IdentityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IdentityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
