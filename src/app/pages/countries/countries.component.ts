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
  takeUntil,
  catchError,
  Subject,
} from 'rxjs';
import { CountryService } from 'src/app//services/country.service';
import { ApiResponse } from 'src/app/models/apiResponse';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, OnDestroy {
  countries: BehaviorSubject<ApiResponse[]> = new BehaviorSubject([
    { name: { common: '' }, flags: { svg: '' }, population: 0, capital: '' },
  ]);

  autocompleteValue = new FormControl('');
  noResults: boolean = false;
  isLoading: boolean = false;
  private _subscription!: Subscription;
  private destroy$ = new Subject<void>();

  constructor(
    private countrieService: CountryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._subscription = this.autocompleteValue.valueChanges
      .pipe(
        startWith(''),
        // Wait 800ms after each keystroke before considering the term
        debounceTime(800),
        switchMap((val) => {
          this.noResults = false;
          // If the value is an empty string don't start making HTTP call
          return !!val?.trim() ? this.onAutocomplete(val) : of([]);
        })
      )
      .subscribe((err) => this.countries.next([]));
  }

  onAutocomplete(val: string) {
    this.isLoading = true;
    // Emit a value to cancel any ongoing request
    this.destroy$.next();

    this.countrieService
      .autocomplete(val)
      .pipe(
        takeUntil(this.destroy$), // Cancel the previous request when a new one starts
        catchError((error) => {
          this.isLoading = false;
          this.noResults = true;
          return of([]);
        })
      )
      .subscribe((v: ApiResponse[]) => {
        this.countries.next(v);
        this.isLoading = false;
        this.noResults = this.countries.getValue().length == 0;
      });
    return this.countries.getValue();
  }

  onSelectCountry(countryName: string) {
    this.router.navigate([countryName], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();

    this.destroy$.next();
    this.destroy$.complete();
  }
}
