import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Order } from '../model/order.interface';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrderService } from '../services/order.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private order: Order;

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly orderService: OrderService
  ) {
    const user = this.authService.loadUser();
    this.order = {
      itemId: '5da7059d29b9e120944945dc',
      quantity: 1,
      userId: user.id,
      complete: false
    };
  }

  getHeaders(): { headers: HttpHeaders } {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authService.getToken()
      })
    };
    return httpOptions;
  }

  sendTestOrder(): Observable<Order> {
    return this.http.post<Order>(
      `${environment.apiUrl}/order/create`,
      this.order,
      this.getHeaders()
    );
  }

  clearOrders(): void {
    console.log('Delete all...');
    this.orderService.deleteAllOrders().subscribe();
  }
}
