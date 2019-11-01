import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Cityscape';
  currentUsername: string;

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      this.setCurrentUsername();
    });
  }

  ngOnInit(): void {
    this.setCurrentUsername();
  }

  get isUserLoggedIn() {
    return firebase.auth().currentUser ? true : false;
  }

  setCurrentUsername() {
    if (this.isUserLoggedIn) {
      const userID = firebase.auth().currentUser.uid;
      const db = firebase.database();
      db.ref('/users/' + userID).once('value').then((snapshot) => {
        this.currentUsername = snapshot.val().username;
      });
    } else {
      this.currentUsername = null;
    }
  }
}
