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
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.user = new FirebaseUserModel();
    this.userID = firebase.auth().currentUser.uid; // pulls user ID which will use to find the user info in database.
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required ]
    });
  }

  save(value){
    this.userService.updateCurrentUser(value)
      .then(res => {
        console.log(res);
      }, err => console.log(err));
  }

  logout(){
    this.userService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log('Logout error', error);
      });
  }

}
