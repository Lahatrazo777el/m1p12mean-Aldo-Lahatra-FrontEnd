import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RdvService {
  private apiUrl = `${environment.apiUrl}/rendezvous`;
  constructor(private http: HttpClient) { }
  addRdv(data : any): Observable<any>{
    return this.http.post(this.apiUrl,data);
  }
  validaterdv(id : string): Observable<any>{
    return this.http.post(`${this.apiUrl}/validate/${id}`,null);
  }
  cancelrdv(id : string): Observable<any>{
    return this.http.post(`${this.apiUrl}/${id}`,null);
  }
  getrdv(): Observable<any>{
    return this.http.get(this.apiUrl);
  }
  getRdvByUser(id: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  deleteRdvByUser(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
