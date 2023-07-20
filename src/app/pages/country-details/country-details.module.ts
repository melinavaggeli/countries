import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CountryDetailsComponent } from './country-details.component';
import { CountryCardComponent } from 'src/app/components/country-card/country-card.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
@NgModule({
  declarations: [CountryDetailsComponent, CountryCardComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CountryDetailsComponent,
      },
    ]),
  ],
})
export class CountryDetailsModule {}
