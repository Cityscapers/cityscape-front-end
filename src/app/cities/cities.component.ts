import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {first, map} from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css'],
  providers: [DatePipe]
})
export class CitiesComponent implements OnInit {

  forecast: any;
  forecastMin: number[] = [];
  forecastMax: number[] = [];
  description: number[] = [];
  icon: number[] = [];
  date: string[] = [];
  forecastURL = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
  forecastAPIKey = '8Meeqclwe4jseviBEgDp4xrYHMiwUeAB';
  cityName: string;
  degrees = '°F';
  locationKey: string;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getForecast();
  }

   getForecast() {
      this.locationKey = '326857';
      this.httpClient.get(this.forecastURL + this.locationKey + '?apikey=' + this.forecastAPIKey)
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
    });
   }
}
