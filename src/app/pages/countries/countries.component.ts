import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  map,
  of,
  startWith,
  switchMap,
  Subscription,
} from 'rxjs';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, OnDestroy {
  myControl = new FormControl('');
  countries = new BehaviorSubject([{ name: { common: '' } }]);
  autocompleteValue = new FormControl('');
  error: boolean = false;
  loading: boolean = false;
  private subscription!: Subscription;

  constructor(private countrieService: CountryService) {}

  ngOnInit(): void {
    this.subscription = this.autocompleteValue.valueChanges
      .pipe(
        startWith(''),
        debounceTime(800),
        switchMap((val) => {
          this.error = false;
          return !!val?.trim() ? this.onAutocomplete(val) : of([]);
        }),
        map((val) => {
          return val;
        })
      )
      .subscribe((err) => this.countries.next([]));
  }

  onAutocomplete(val: string) {
    this.loading = true;
    this.error = false;
    this.countrieService.autocomplete(val).subscribe(
      (v: any) => {
        this.countries.next(v);
        this.loading = false;
        this.error = this.countries.getValue().length == 0;
      },
      (err) => {
        this.loading = false;
      }
    );

    return this.countries.getValue();
  }

  onSelectCountry(countryName: string) {
    //TODO: navigate to country detail
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
