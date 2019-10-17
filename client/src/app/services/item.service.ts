import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Item } from '../model/item.interface';
import { environment } from 'src/environments/environment';
import { ItemRequest } from '../dto/item-request.interface';

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

  createItem(itemRequest: ItemRequest): Observable<Item> {
    return this.http
      .post<Item>(
        `${environment.apiUrl}/items/create`,
        itemRequest,
        this.getHeaders()
      )
      .pipe();
  }

  deleteItem(id: string): Observable<Item> {
    return this.http.delete<Item>(
      `${environment.apiUrl}/items/delete/${id}`,
      this.getHeaders()
    );
  }

  updateItem(itemRequest: ItemRequest): Observable<Item> {
    console.log(itemRequest);
    return this.http.put<Item>(
      `${environment.apiUrl}/items/update`,
      itemRequest,
      this.getHeaders()
    );
  }
}
