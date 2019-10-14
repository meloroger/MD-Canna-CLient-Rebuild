import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/order.interface';
import { AuthService } from './auth.service';
import { tap, subscribeOn } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

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
    return this.http
      .post<Order>(
        `${environment.apiUrl}/order/create`,
        order,
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

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(
      `${environment.apiUrl}/order/update`,
      order,
      this.getHeaders()
    );
  }
}
