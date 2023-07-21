import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  debounceTime,
  map,
  of,
  startWith,
  switchMap,
  Subscription,
} from 'rxjs';
import { CountryService } from 'src/app//services/country.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, OnDestroy {
  countries = new BehaviorSubject([
    { name: { common: '' }, flags: { svg: '' } },
  ]);
  autocompleteValue = new FormControl('');
  noResults: boolean = false;
  isLoading: boolean = false;
  private _subscription!: Subscription;

  constructor(
    private countrieService: CountryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._subscription = this.autocompleteValue.valueChanges
      .pipe(
        startWith(''),
        debounceTime(800),
        switchMap((val) => {
          this.noResults = false;
          return !!val?.trim() ? this.onAutocomplete(val) : of([]);
        }),
        map((val) => {
          return val;
        })
      )
      .subscribe((err) => this.countries.next([]));
  }

  onAutocomplete(val: string) {
    this.isLoading = true;
    this.countrieService.autocomplete(val).subscribe(
      (v: any) => {
        this.countries.next(v);
        this.isLoading = false;
        this.noResults = this.countries.getValue().length == 0;
      },
      (err) => {
        this.noResults = true;
        this.isLoading = false;
      }
    );
    return this.countries.getValue();
  }

  onSelectCountry(countryName: string) {
    this.router.navigate([countryName], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
