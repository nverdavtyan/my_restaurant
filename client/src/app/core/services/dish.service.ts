import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private apiUrl = 'http://localhost:8080/dish';

  constructor(private http: HttpClient) {}

  getDishes() {
    return this.http.get<any>(this.apiUrl);
  }

  post(dish: any): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      responseType: 'text' as 'json',
    });

    const httpOptionsMultipart = {
      headers: headers,
      withCredentials: true,
      responseType: 'text' as 'json',
    };

    return this.http.post(this.apiUrl, dish, httpOptionsMultipart);
  }

  updateDish(id: any,dish:any): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });

    const httpOptionsMultipart = {
      headers: headers,
      withCredentials: true,
      responseType: 'text' as 'json',
    };
    return this.http.put(this.apiUrl + '/' + id, dish, httpOptionsMultipart);
  }

  deleteDish(id: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}
