import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {first, map} from 'rxjs/operators';




@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  data: any;
  apiKey = '0eba6688959b389b3be6d2398b5a5ec5';
  url = 'http://api.openweathermap.org/data/2.5/weather?q=';
  cityName: string;
  cityTemp: number;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    // this.httpClient.get(this.url + this.cityName + '&appid=' + this.apiKey).subscribe(data => {
    //   this.data = data;
    // });
    // console.log('data: ' + this.data);

  }

  getData() {
     this.httpClient.get(this.url + this.cityName + '&appid=' + this.apiKey).subscribe((data: any)  => {
      this.data = data;
      this.convertTemp(data.main.temp);
      });
  }

  convertTemp(temp: number) {
    this.cityTemp = ((temp - 273.15) * (9 / 5) + 32);
    Math.round(this.cityTemp);
  }
}
