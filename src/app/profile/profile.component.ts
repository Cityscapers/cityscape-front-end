import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserInformationService} from '../shared/services/user.information.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseUserModel} from '../shared/models/user.model';
import { Location } from '@angular/common';
import * as firebase from 'firebase';
import {FirebaseUserCitiesModel} from '../shared/models/user-cities.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: FirebaseUserModel;
  userID: any;
  interestedCities: FirebaseUserCitiesModel[];
  favoriteState: string;

  constructor(
    public userService: UserInformationService,
    private route: ActivatedRoute,
    private location: Location,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.user = new FirebaseUserModel();
    this.interestedCities = [];
    this.setUserInfo();
  }


  setUserInfo() {
    if (this.isUserLoggedIn) {
      this.userID = firebase.auth().currentUser.uid;
      const db = firebase.database();
      db.ref('/users/' + this.userID).once('value').then((snapshot) => {
        this.user = snapshot.val(); // get the current user
      });
      db.ref('/users/' + this.userID + '/cities').once('value').then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          this.interestedCities.push(childSnapshot.val()); // push each city object to an array of interested cities
        });
        this.favoriteState = this.calculateFavoriteState(this.interestedCities);
      });
    } else {
      this.user = null;
    }
  }
  calculateFavoriteState(cities) {
    if ( cities.length === 0) {
      return 'No favorite city!';
    }
    let counts: any = {};
    let compare = 0;
    let mostFrequent: string = '';
    for (let i = 0; i < cities.length; i++) {
      let word = cities[i].state;
      if (counts[word] === undefined) {
        counts[word] = 1;
      }
      else {
        counts[word] = counts[word] + 1;
      }
      if (counts[word] > compare) {
        compare = counts[word];
        mostFrequent = word;
      }
    }
    return 'Your favorite state is ' + mostFrequent + '!';
  }
  removeCity(city) {
    this.userService.removeCityFromUserInDatabase(city, this.userID).then(
      (res) => {
      console.log('SUCCESSFUL REMOVAL OF ' + res.city + ', ' + res.state);
      this.interestedCities = [];
      this.setUserInfo();
    },
      (reject) => {
      console.log('ERROR WITH REMOVAL: ' + reject);
      });
  }


  logout() {
    this.userService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log('Logout error', error);
      });
  }
  get isUserLoggedIn() {
    return firebase.auth().currentUser ? true : false;
  }
}
