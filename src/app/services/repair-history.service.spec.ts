import { TestBed } from '@angular/core/testing';

import { RepairHistoryService } from './repair-history.service';

describe('RepairHistoryService', () => {
  let service: RepairHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepairHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
