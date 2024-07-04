import { TestBed } from '@angular/core/testing';

import { PanierCrudService } from './panier-crud.service';

describe('PanierCrudService', () => {
  let service: PanierCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanierCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
