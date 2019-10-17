import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.interface';
import { AuthRequest } from '../dto/auth-request.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: string;
  user: User;
  isLoggedIn: boolean;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.loadToken();
    this.loadUser();
  }

  getHeaders(): { headers: HttpHeaders } {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.getToken()
      })
    };
    return httpOptions;
  }

  authenticateUser(authRequest: AuthRequest): Observable<User> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http
      .post<User>(`${environment.apiUrl}/user/login`, authRequest, {
        headers
      })
      .pipe(tap(data => (this.user = data)));
  }

  // JWT by default looks for 'id_token' in local storage
  storeUserData(token: string, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
    this.authToken = token;
    this.user = user;
    this.isLoggedIn = true;
  }

  loadUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getToken() {
    return this.authToken;
  }

  loggedIn() {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      return true;
    }
    return this.isLoggedIn;
  }

  logout(): Observable<any> {
    this.authToken = null;
    this.user = null;
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/']);
    return this.http.post<any>(
      `${environment.apiUrl}/user/logout`,
      null,
      this.getHeaders()
    );
  }
}
