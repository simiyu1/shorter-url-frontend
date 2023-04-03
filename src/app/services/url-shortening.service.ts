import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UrlMapping } from '../models/url-mapping.model';


@Injectable({
  providedIn: 'root'
})
export class UrlShorteningService {

  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  shortenUrl(data: { longUrl: string,  customAlias?: string }, headers: HttpHeaders): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/shorten`, data, { headers });
  }

  getShortenedUrls(headers: HttpHeaders): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/shortened-urls`, { headers });
  }

  getAllUrls(headers: HttpHeaders): Observable<UrlMapping[]> {
    return this.http.get<UrlMapping[]>(`${this.apiUrl}/urls`, { headers });
  }
}