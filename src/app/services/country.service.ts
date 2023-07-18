import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  autocompletUrl: string;

  constructor(private http: HttpClient) {
    this.autocompletUrl = 'https://restcountries.com/v3.1/name';
  }

  autocomplete(name: string) {
    return this.http.get(`${this.autocompletUrl}/${name}`);
  }
}
