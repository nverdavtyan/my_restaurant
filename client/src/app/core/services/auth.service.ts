import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) {}

  public hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  login(model: any) {
    return this.http.post(this.baseUrl + '/user/authenticate', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('access_token', user.access_token);
          localStorage.setItem('refresh_token', user.refresh_token);
          this.loggedIn.next(true);
        }
        return user;
      })
    );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.loggedIn.next(false);
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }
}
