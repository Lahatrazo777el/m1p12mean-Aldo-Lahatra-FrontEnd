import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculeService {
  private apiUrl = `${environment.apiUrl}/vehicules`;
  constructor(private http: HttpClient) { }
  
  getAllVehicule(): Observable<any>{
    return this.http.get(this.apiUrl);
  }
  addVehicule(data : any): Observable<any>{
    return this.http.post(this.apiUrl,data);
  } 
  findVehicule(id: string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  deleteVehicule(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
