import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getLastFiveUrls(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/urls/last-five`);
  }

  getSummary(): Observable<{ totalUrls: number, uniqueClicks: number, numberOfUsers: number }> {
    return this.http.get<{ totalUrls: number, uniqueClicks: number, numberOfUsers: number }>(`${this.apiUrl}/urls/summary`);
  }

  getLastFiveUrlsEndpoint(): string {
    return `${this.apiUrl}/last-five-urls`;
  }

  getSummaryEndpoint(): string {
    return `${this.apiUrl}/summary`;
  }
}
