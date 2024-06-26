import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class DishService {


  constructor(private http: HttpClient) {}

  getDishes() {
    return this.http.get<any>(environment.apiUrl + '/dish');
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

    return this.http.post(environment.apiUrl + '/dish', dish, httpOptionsMultipart);
  }

  updateDish(id: any, dish: any): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });

    const httpOptionsMultipart = {
      headers: headers,
      withCredentials: true,
      responseType: 'text' as 'json',
    };
    return this.http.put(
      environment.apiUrl+ '/dish/' + id,
      dish,
      httpOptionsMultipart
    );
  }

  deleteDish(id: any): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}
