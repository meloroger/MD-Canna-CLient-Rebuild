import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.interface';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { RegisterRequest } from '../dto/register-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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

  registerUser(register: RegisterRequest): Observable<User> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<User>(
      `${environment.apiUrl}/user/register`,
      register,
      {
        headers
      }
    );
  }

  getUsers(): Observable<User> {
    return this.http.get<User>(
      `${environment.apiUrl}/user/all`,
      this.getHeaders()
    );
  }

  deleteUser(id: string) {
    return this.http.delete<User>(
      `${environment.apiUrl}/user/delete/${id}`,
      this.getHeaders()
    );
  }

  updateUser(user: User) {
    return this.http.put<User>(
      `${environment.apiUrl}/user/update`,
      user,
      this.getHeaders()
    );
  }
}
