import { TestBed } from '@angular/core/testing';

import { ClientsCrudService } from './clients-crud.service';

describe('ClientsCrudService', () => {
  let service: ClientsCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientsCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
