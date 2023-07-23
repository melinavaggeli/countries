import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://restcountries.com/v3.1/name';
  }

  autocomplete(name: string): Observable<ApiResponse[]> {
    return this.http.get<ApiResponse[]>(`${this.apiUrl}/${name}`);
  }

  getCountry(name: string): Observable<ApiResponse[]> {
    return this.http.get<ApiResponse[]>(`${this.apiUrl}/${name}?fullText=true`);
  }
}
