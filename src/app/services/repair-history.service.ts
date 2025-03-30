import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepairHistoryService {
  private apiUrl = `${environment.apiUrl}/repair-histories`;
  constructor(private http: HttpClient) { }

  getRepairHistories(params?: any): Observable<any>{
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if(params[key] != ''){

          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.get(this.apiUrl, {params: httpParams});
  } 
  getRepairHistoriesMecano(id: string,params?: any): Observable<any>{
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if(params[key] != ''){

          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.get(`${this.apiUrl}/mecanicien/${id}`, {params: httpParams});
  }
  getRepairHistoriesClient(id: string,params?: any): Observable<any>{
    let httpParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        if(params[key] != ''){

          httpParams = httpParams.set(key, params[key]);
        }
      }
    }
    return this.http.get(`${this.apiUrl}/client/${id}`, {params: httpParams});
  } 
  addRepairHistory(data : any): Observable<any>{
    return this.http.post(this.apiUrl,data);
  }  
  findRepairHistory(id: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  } 
}
