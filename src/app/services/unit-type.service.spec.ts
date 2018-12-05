import { TestBed } from '@angular/core/testing';

import { UnitTypeService } from './unit-type.service';

describe('UnitTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnitTypeService = TestBed.get(UnitTypeService);
    expect(service).toBeTruthy();
  });
});
