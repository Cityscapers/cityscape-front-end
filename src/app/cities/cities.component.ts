import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {first, map} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
  providers: [DatePipe]
})
export class CitiesComponent implements OnInit {

  loading = false;
  forecast: any;
  locations: any;
  forecastMin: number[] = [];
  forecastMax: number[] = [];
  description: number[] = [];
  icon: string[] = [];
  date: string[] = [];
  forecastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  locationKeyURL = 'http://dataservice.accuweather.com/locations/v1/cities/search?apikey=';
  forecastAPIKey = '8Meeqclwe4jseviBEgDp4xrYHMiwUeAB';
  cityName: string;
  degrees = '°F';
  locationKey: string;
  state: string;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    //this.getForecast();
    this.route.paramMap.subscribe(params => {
    this.state = params.get('state');
    this.cityName = params.get('city');
  });
    this.getLocationKey();
  }

   getLocationKey() {
    this.httpClient.get(this.locationKeyURL + this.forecastAPIKey + '&q=' + this.cityName)
      .subscribe((locations: any) => {
        this.locations = locations;
        for ( let i = 0; i < this.locations.length; i++) {
          console.log(this.locations[i].AdministrativeArea.EnglishName);
          console.log(this.state);
          if (this.locations[i].AdministrativeArea.EnglishName === this.state) {
            this.locationKey = this.locations[i].Key;
            this.getForecast(this.locationKey);
          }
        }
      });
   }

   getForecast(locationKey: string) {
     this.loading = true;
     this.httpClient.get(this.forecastURL + locationKey + '?apikey=' + this.forecastAPIKey)
      .subscribe((forecast: any) => {
        this.forecast = forecast;
        for ( let i = 0; i < 5; i++) {
          this.forecastMin.push(this.forecast.DailyForecasts[i].Temperature.Minimum.Value);
          this.forecastMax.push(this.forecast.DailyForecasts[i].Temperature.Maximum.Value);
          this.description.push(this.forecast.DailyForecasts[i].Day.IconPhrase);
          if (this.forecast.DailyForecasts[i].Day.Icon < 10) {
            this.icon.push('https://developer.accuweather.com/sites/default/files/0' + this.forecast.DailyForecasts[i].Day.Icon + '-s.png');
          } else {
            this.icon.push('https://developer.accuweather.com/sites/default/files/' + this.forecast.DailyForecasts[i].Day.Icon + '-s.png');
          }
          this.date.push(this.forecast.DailyForecasts[i].Date);
        }
        this.loading = false;

      });
   }
}
