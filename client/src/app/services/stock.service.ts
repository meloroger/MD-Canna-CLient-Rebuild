import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { StockMovement } from '../model/stock-movement.interface';
import { environment } from 'src/environments/environment';
import { StockRequest } from '../dto/stock-request.interface';

@Injectable({
  providedIn: 'root'
})
export class StockService {
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

  fetchAllStockMovements(): Observable<StockMovement[]> {
    return this.http.get<StockMovement[]>(
      `${environment.apiUrl}/stock/all`,
      this.getHeaders()
    );
  }

  createStockMovement(stockRequest: StockRequest): Observable<StockMovement> {
    return this.http.post<StockRequest>(
      `${environment.apiUrl}/stock/create`,
      stockRequest,
      this.getHeaders()
    );
  }

  deleteStockMovement(id: string): Observable<StockMovement> {
    return this.http.delete<StockMovement>(
      `${environment.apiUrl}/stock/delete/${id}`,
      this.getHeaders()
    );
  }

  updateStockMovement(stockMovement: StockMovement): Observable<StockMovement> {
    return this.http.put<StockMovement>(
      `${environment.apiUrl}/stock/update`,
      stockMovement,
      this.getHeaders()
    );
  }
}
