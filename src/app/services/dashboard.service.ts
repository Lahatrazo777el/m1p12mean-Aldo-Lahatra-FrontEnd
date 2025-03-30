import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/dashboard`;
  constructor(private http: HttpClient) { }

  loadTotalIncome(params?: any):Observable<any>{
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if(params[key] != ''){

          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.get(`${this.apiUrl}/total-income`, {params: httpParams}); 
  }
  
  loadIncomeService(params?: any):Observable<any>{
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if(params[key] != ''){

          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.get(`${this.apiUrl}/service-income`, {params: httpParams}); 
  } 

  loadTotalIncomeYear():Observable<any>{
    return this.http.get(`${this.apiUrl}/total-income-year`); 
  } 

  loadMecanicienPerf():Observable<any>{
    return this.http.get(`${this.apiUrl}/mecanicien-performance`); 
  } 
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
