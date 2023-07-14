import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class SectionService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    }),
  };

  constructor(private http: HttpClient) {}

  getSections(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl+ '/section');
  }

  createSection(section: any): Observable<any> {
    return this.http.post<any>(
      environment.apiUrl+ '/section',
      section,
      this.httpOptions
    );
  }

  deleteSection(id: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/section/${id}`,
      this.httpOptions
    );
  }
}
