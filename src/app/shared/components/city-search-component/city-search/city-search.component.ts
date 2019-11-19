import { Component, OnInit } from '@angular/core';
import {CitySearchService} from '../../../services/city-search.service';
import * as firebase from 'firebase';
import {UserInformationService} from '../../../services/user.information.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {

  results: any[]; // results is an array of objects with 2 members, city & state

  constructor( private searchService: CitySearchService,
               private userService: UserInformationService,
               private toastService: ToastrService) {
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
  addCity(city: any) {
    const userID  = firebase.auth().currentUser.uid;
    this.userService.getCurrentUserCityList(userID).then((res) => {
      for (let i = 0; i < res.length; i++) {
        if (city.city === res[i].city && city.state === res[i].state) {
          this.toastService.error(city.city + ', ' + city.state + ' is already in your dashboard!', 'Error adding city!');
          return;
        }
      }
      this.userService.addCityToUserInDatabase(city, userID);
      this.toastService.success('Added ' + city.city + ', ' + city.state + ' to your dashboard!', 'Success!');
    });
  }

}
