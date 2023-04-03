import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlShorteningService {
  private apiUrl = 'http://localhost:8080/api'; // Confirm backend

  constructor(private http: HttpClient) { }

  shortenUrl(data: { longUrl: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/shorten`, data);
  }

  getShortenedUrls(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/shortened-urls`);
  }
}