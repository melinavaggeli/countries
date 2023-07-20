import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountriesComponent } from './countries.component';

const routes: Routes = [
  {
    path: '',
    component: CountriesComponent,
  },
  {
    path: ':countryName',
    loadChildren: () =>
      import('../country-details/country-details.module').then(
        (m) => m.CountryDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountriesRoutingModule {}
