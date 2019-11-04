import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  get isUserLoggedIn() {
    return firebase.auth().currentUser ? true : false;
  }

}
