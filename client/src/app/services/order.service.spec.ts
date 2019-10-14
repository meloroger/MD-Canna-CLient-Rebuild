import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('OrderService', () => {
  beforeEach(() => {
    let mockAuthService;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OrderService,
        { provide: AuthService, useValue: mockAuthService }
      ]
    });
  });

  it('should be created', () => {
    const service: OrderService = TestBed.get(OrderService);
    expect(service).toBeTruthy();
  });
});
