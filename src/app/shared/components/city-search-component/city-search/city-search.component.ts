import { Component, OnInit } from '@angular/core';
import {CitySearchService} from '../../../services/city-search.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {

  results: any[]; // results is an array of objects with 2 members, city & state

  constructor( private searchService: CitySearchService) {
  }

  ngOnInit() {
  }

  searchForCity(event: any) {
    const term = event.target.value;
    this.searchService.searchForCity(term)
      .subscribe( results => {
        this.results = results;
      });
  }

}
