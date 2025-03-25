import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/dashboard`;
  constructor(private http: HttpClient) { }

  getCountUser(): Observable<any>{
    return this.http.get(`${this.apiUrl}/count-user`);
  }
  getMecanicienDispoNow(): Observable<any>{
    return this.http.get(`${this.apiUrl}/mecanicien-dispo`);
  }
  getCountClientPerMonth(): Observable<any>{
    return this.http.get(`${this.apiUrl}/count-client`);
  }
  getCountRendezVousPerMonth(): Observable<any>{
    return this.http.get(`${this.apiUrl}/count-rdv`);
  }
}
