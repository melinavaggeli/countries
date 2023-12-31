import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { ApiResponse } from 'src/app/models/apiResponse';
import { Country } from 'src/app/models/country';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnInit, OnDestroy {
  country!: Country;
  isLoading: boolean = true;
  private _subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private countryService: CountryService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //Get the country name from the route
    const countryName = this.route.snapshot.paramMap.get('countryName') || '';

    //Get the country details
    this._subscription = this.countryService
      .getCountry(countryName)
      .pipe(take(1))
      .subscribe(
        (country: ApiResponse[]) => {
          this.isLoading = false;
          this.setCountry(country[0]);
        },
        (error) => {
          this.handleCountryNotFoundError();
        }
      );
  }

  //Set the country details
  private setCountry(country: ApiResponse): void {
    this.country = {
      name: country.name.common,
      capital: country.capital,
      flag: country.flags.svg,
      population: country.population,
    };
  }

  //Show a snackbar and navigate to the home page
  private handleCountryNotFoundError(): void {
    this._snackBar.open('Country Not Found', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
