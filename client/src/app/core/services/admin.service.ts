import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {


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
    return this.http.get(environment.apiUrl+ '/restaurant/manage', this.httpOptions);
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

    return this.http.post(
      environment.apiUrl + '/restaurant',
      restaurant,
      httpOptionsMultipart
    );
  }

  updateRestaurant(restaurant: any): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    });

    const httpOptionsMultipart = {
      headers: headers,
      withCredentials: true,
      responseType: 'text' as 'json',
    };
    return this.http.put(environment.apiUrl, restaurant, httpOptionsMultipart);
  }

  deleteRestaurant(): Observable<any> {
    return this.http.delete(environment.apiUrl + '/restaurant', this.httpOptions);
  }
}
