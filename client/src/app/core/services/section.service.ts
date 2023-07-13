
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SectionService {
  private apiUrl = 'http://localhost:8080/section'; // changez ceci pour l'URL de votre API


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
    }),
  };

  constructor(private http: HttpClient) {}

  getSections(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createSection(section: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, section, this.httpOptions);
  }

  deleteSection(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, this.httpOptions);
  }
  
}
