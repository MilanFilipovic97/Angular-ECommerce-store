import { TestBed } from '@angular/core/testing';

import { ProizvodiDetaljiService } from './proizvodi-detalji.service';

describe('ProizvodiDetaljiService', () => {
  let service: ProizvodiDetaljiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProizvodiDetaljiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
