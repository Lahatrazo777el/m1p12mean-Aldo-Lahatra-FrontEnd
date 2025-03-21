import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly jwtHelper = new JwtHelperService();
  private apiUrl = `${environment.apiUrl}/login`;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn()); // Initial state

  private roleSubject = new BehaviorSubject<null | string>(this.getRole()); // Initial state

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); // Expose as observable
  role$ = this.roleSubject.asObservable(); // Expose as observable

  constructor(private http: HttpClient) {}

  login(mail: string, pswd: string): Observable<any> {
    return this.http.post(`${this.apiUrl}`, { mail, pswd });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.isAuthenticatedSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  getUser(): any | null {
    const token = this.getToken();
    if (token && this.isLoggedIn()) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  getRole(): string | null {
    const user = this.getUser();
    return user ? user.role.name : null;
  }

  get isMecanicien(): boolean {
    return this.roleSubject.value === 'Mecanicien';
  }
  
  get isManager(): boolean {
    return this.roleSubject.value === 'Manager';
  }
  
  get isClient(): boolean {
    return this.roleSubject.value === 'Client';
  }
}
