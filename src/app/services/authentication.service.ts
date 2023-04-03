import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8080/api'; // Confirm backend 

  constructor(private httpClient: HttpClient) { }

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/login`, credentials);
  }
}