import { Component, OnInit } from '@angular/core';
import {CitySearchService} from '../../../services/city-search.service';
import * as firebase from 'firebase';
import {UserInformationService} from '../../../services/user.information.service';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {

  results: any[]; // results is an array of objects with 2 members, city & state

  constructor( private searchService: CitySearchService,
               private userService: UserInformationService) {
  }

  ngOnInit() {
    this.retrieveInterestedCities();
  }

  searchForCity(event: any) {
    const term = event.target.value;
    this.searchService.searchForCity(term)
      .subscribe( results => {
        const interestedCities = this.retrieveInterestedCities();
        this.results = results;
        // for ( const obj in interestedCities) {
        //   if (this.results.indexOf(interestedCities[obj]) === -1) {
        //     this.results = this.results.filter(interestedCities[obj]);
        //   }
        // }
      });
  }
  addCity(city: any) {
    console.log(city);
    const userID = firebase.auth().currentUser.uid;
    this.userService.addCityToUserInDatabase(city, userID);
  }

  retrieveInterestedCities(): any {
    this.userService.getCurrentUserCityList().then((res) => {
        return res;
    });
  }
}
