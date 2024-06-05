import { TestBed } from '@angular/core/testing';

import { GapSizeService } from './gap-size.service';

describe('GapSizeService', () => {
  let service: GapSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GapSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
