import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class SectionService {
  private apiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    }),
  };

  constructor(private http: HttpClient) {}

  getSections(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/section');
  }

  createSection(section: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + '/section/',
      section,
      this.httpOptions
    );
  }

  deleteSection(id: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiUrl}/section/${id}`,
      this.httpOptions
    );
  }
}
