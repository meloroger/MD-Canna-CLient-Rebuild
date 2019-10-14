import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Item } from '../model/item.model';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StockMovement } from '../model/stock-movement.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
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

  fetchAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(
      `${environment.apiUrl}/items/all`,
      this.getHeaders()
    );
  }

  createItem(item: Item): Observable<Item> {
    return this.http
      .post<Item>(`${environment.apiUrl}/items/create`, item, this.getHeaders())
      .pipe();
  }

  deleteItem(id: string): Observable<Item> {
    return this.http.delete<Item>(
      `${environment.apiUrl}/items/delete`,
      this.getHeaders()
    );
  }

  updateItem(item: Item): Observable<Item> {
    return this.http.put<Item>(
      `${environment.apiUrl}/items/update`,
      item,
      this.getHeaders()
    );
  }
}
