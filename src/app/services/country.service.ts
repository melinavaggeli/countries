import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://restcountries.com/v3.1/name';
  }

  autocomplete(name: string) {
    return this.http.get(`${this.apiUrl}/${name}`);
  }

  getCountry(name: string) {
    return this.http.get(`${this.apiUrl}/${name}?fullText=true`);
  }
}
