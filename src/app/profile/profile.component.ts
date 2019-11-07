import { Component, OnInit } from '@angular/core';
import {UserInformationService} from '../shared/services/user.information.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseUserModel} from '../shared/models/user.model';
import { Location } from '@angular/common';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: FirebaseUserModel;
  userID: any;
  profileForm: FormGroup;

  constructor(
    public userService: UserInformationService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.user = new FirebaseUserModel();
    this.setUserInfo();
  }


  setUserInfo() {
    if (this.isUserLoggedIn) {
      this.userID = firebase.auth().currentUser.uid;
      const db = firebase.database();
      db.ref('/users/' + this.userID).once('value').then((snapshot) => {
        this.user = snapshot.val();
      });
    } else {
      this.user = null;
    }
  }

  save(value) {
    this.userService.updateCurrentUser(value)
      .then(res => {
        console.log(res);
      }, err => console.log(err));
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
