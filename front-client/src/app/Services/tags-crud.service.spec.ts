import { TestBed } from '@angular/core/testing';

import { TagsCrudService } from './tags-crud.service';

describe('TagsCrudService', () => {
  let service: TagsCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
