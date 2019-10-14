import { TestBed } from '@angular/core/testing';

import { StockService } from './stock.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('StockService', () => {
  let mockAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        StockService,
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
  });

  it('should be created', () => {
    const service: StockService = TestBed.get(StockService);
    expect(service).toBeTruthy();
  });
});
