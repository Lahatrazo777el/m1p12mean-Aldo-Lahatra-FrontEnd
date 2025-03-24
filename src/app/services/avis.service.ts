import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisService {
  private apiUrl = `${environment.apiUrl}/avis`;
  constructor(private http: HttpClient) { }

  addAvis(data : any): Observable<any>{
    return this.http.post(this.apiUrl,data);
  }    
}
