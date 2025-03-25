import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrestationService {
  private apiUrl = `${environment.apiUrl}/prestations`;
  constructor(private http: HttpClient) { }
  
  getPrestations(params?: any): Observable<any>{
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
  addPrestation(data : any): Observable<any>{
    return this.http.post(this.apiUrl,data);
  } 
  findPrestation(id: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  } 
  updatePrestation(id: string, data: any): Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`,data);
  } 
  deletePrestation(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
