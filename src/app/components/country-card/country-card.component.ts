import { Component, Input, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.scss'],
})
export class CountryCardComponent implements OnInit {
  @Input() country!: Country;
  @Input() isLoading: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
