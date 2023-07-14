import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getRestaurants() {
    return this.http.get<any>(this.apiUrl + '/restaurant/all');
  }

  getRestaurantById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/restaurant/${id}`);
  }

  createReview(review: any): Observable<any> {
    return this.http.post(this.apiUrl + '/review', review);
  }
}
