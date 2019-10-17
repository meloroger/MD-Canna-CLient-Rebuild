import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order.interface';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OrderRequest } from '../dto/order-request.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getHeaders(): { headers: HttpHeaders } {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authService.getToken()
      })
    };
    return httpOptions;
  }

  getOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(`${environment.apiUrl}/order/all`, this.getHeaders())
      .pipe();
  }

  createOrder(order: Order): Observable<Order> {
    const user = this.authService.loadUser();
    const orderRequest = {
      ...order,
      userId: user.id,
      complete: false
    };
    console.log(order);
    return this.http
      .post<Order>(
        `${environment.apiUrl}/order/create`,
        orderRequest,
        this.getHeaders()
      )
      .pipe(tap(data => console.log(data)));
  }

  deleteOrder(id: string): Observable<Order> {
    return this.http.delete<Order>(
      `${environment.apiUrl}/order/delete/${id}`,
      this.getHeaders()
    );
  }

  updateOrder(orderRequest: OrderRequest): Observable<Order> {
    console.log(orderRequest);
    return this.http.put<OrderRequest>(
      `${environment.apiUrl}/order/update`,
      orderRequest,
      this.getHeaders()
    );
  }
}
