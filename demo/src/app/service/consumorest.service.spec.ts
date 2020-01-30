import { TestBed } from '@angular/core/testing';

import { ConsumorestService } from './consumorest.service';

describe('ConsumorestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsumorestService = TestBed.get(ConsumorestService);
    expect(service).toBeTruthy();
  });
});
