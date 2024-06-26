import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    }),
  };

  getSections(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/section');
  }

  addDishToSection(sectionId: string, dishId: string): Observable<any> {
    const url = `${environment.apiUrl}/section/${sectionId}/dishes/${dishId}`;
    return this.http.post<any>(url, {});
  }

  removeDishFromSection(sectionId: string, dishId: string): Observable<any> {
    const url = `${environment.apiUrl}/section/${sectionId}/dishes/${dishId}`;
    return this.http.delete<any>(url);
  }
}
