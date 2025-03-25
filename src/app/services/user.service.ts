import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }
  
  getAllUser(): Observable<any>{
    return this.http.get(this.apiUrl);
  }
  getTeam(): Observable<any>{
    return this.http.get(`${this.apiUrl}/team`);
  }
  getLoyalUser(): Observable<any>{
    return this.http.get(`${this.apiUrl}/loyal`);
  }
  getUserByRole(roleName: String): Observable<any>{
    return this.http.get(`${this.apiUrl}/role/${roleName}`);
  }
  addUser(data : any): Observable<any>{
    return this.http.post(this.apiUrl,data);
  } 
  findUser(id: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  } 
  updateUser(id: string, data: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,data);
  } 
  deleteUser(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
