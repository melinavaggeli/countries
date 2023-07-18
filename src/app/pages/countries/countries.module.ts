import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesRoutingModule } from './countries-routing.module';
import { CountriesComponent } from './countries.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [CountriesComponent],
  imports: [
    CommonModule,
    CountriesRoutingModule,
    FormsModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
})
export class CountriesModule {}
