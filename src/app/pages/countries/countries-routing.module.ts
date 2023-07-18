import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountriesComponent } from './countries.component';
import { CountryDetailsComponent } from '../country-details/country-details.component';

const routes: Routes = [
  {
    path: '',
    component: CountriesComponent,
  },
  {
    path: ':countryName',
    component: CountryDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
