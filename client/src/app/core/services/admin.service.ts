import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/restaurant';

  private restaurant = new BehaviorSubject(null);
  currentRestaurant = this.restaurant.asObservable();
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      responseType: 'text' as 'json',
    }),
  };

  constructor(private http: HttpClient) {}

  changeRestaurant(restaurant: any) {
    this.restaurant.next(restaurant);
    console.log(this.restaurant);
  }


  getRestaurantById(): Observable<any> {
    return this.http.get(this.apiUrl + '/manage', this.httpOptions);
  }


  post(restaurant: any): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });

    const httpOptionsMultipart = {
      headers: headers,
      withCredentials: true,
      responseType: 'text' as 'json',
    };

    return this.http.post(this.apiUrl, restaurant, httpOptionsMultipart);
  }

  updateRestaurant(restaurant: any, ): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });

    const httpOptionsMultipart = {
      headers: headers,
      withCredentials: true,
      responseType: 'text' as 'json',
    };
    return this.http.put(this.apiUrl, restaurant, httpOptionsMultipart);
  }

  deleteRestaurant(): Observable<any> {
    return this.http.delete(this.apiUrl, this.httpOptions);
  }
}
