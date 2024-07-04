import { TestBed } from '@angular/core/testing';

import { PanierligneCrudService } from './panierligne-crud.service';

describe('PanierligneCrudService', () => {
  let service: PanierligneCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanierligneCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
