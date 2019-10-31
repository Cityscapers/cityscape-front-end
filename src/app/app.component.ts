import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cityscape';
  constructor() {}

  get isUserLoggedIn() {
    return firebase.auth().currentUser ? true : false;
  }
}
