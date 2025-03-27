import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypevehiculeService {
  private apiUrl = `${environment.apiUrl}/typevehicule`;
  constructor(private http: HttpClient) { }
  
  getAllTypeVehicule(): Observable<any>{
    return this.http.get(this.apiUrl);
  }
  addTypeVehicule(data : any): Observable<any>{
    return this.http.post(this.apiUrl,data);
  }
}
