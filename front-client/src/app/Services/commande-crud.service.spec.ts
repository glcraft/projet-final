import { TestBed } from '@angular/core/testing';

import { CommandeCrudService } from './commande-crud.service';

describe('CommandeCrudService', () => {
  let service: CommandeCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandeCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
