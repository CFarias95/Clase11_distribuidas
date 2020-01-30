import { TestBed } from '@angular/core/testing';

import { ConsumofirebaseService } from './consumofirebase.service';

describe('ConsumofirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConsumofirebaseService = TestBed.get(ConsumofirebaseService);
    expect(service).toBeTruthy();
  });
});
