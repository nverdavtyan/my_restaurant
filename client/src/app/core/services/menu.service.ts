import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = 'http://localhost:8080/section';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    }),
  };

  getSections(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addDishToSection(sectionId: string, dishId: string): Observable<any> {
    const url = `${this.apiUrl}/${sectionId}/dishes/${dishId}`;
    return this.http.post<any>(url, {});
  }
  
  removeDishFromSection(sectionId: string, dishId: string): Observable<any> {
    const url = `${this.apiUrl}/${sectionId}/dishes/${dishId}`;
    return this.http.delete<any>(url);
  }
}
