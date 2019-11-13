import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {AngularFirestore} from '@angular/fire/firestore';
import {CanActivate, Router} from '@angular/router';
import {FirebaseUserCitiesModel} from '../models/user-cities.model';

@Injectable({
  providedIn: 'root'
})
export class UserInformationService implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) { }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.afAuth.auth
        .signInWithPopup(provider)
        .then(res => {
          resolve(res);
        });
    });
  }
  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
          this.setUserInfo(value, res);
        }, err => reject(err));
    });
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getCurrentUser()
        .then(user => {
          this.router.navigate(['/user']);
          return resolve(false);
        }, err => {
          return resolve(true);
        });
    });
  }

  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  getCurrentUserCityList(userID) {
    return new Promise<any>((resolve, reject) =>
    {
      const interestedCities: FirebaseUserCitiesModel[] = [];
      const db = firebase.database();
      db.ref('/users/' + userID).once ('value').then((snapshot) => {
        if (snapshot.hasChild('/cities')) {
          db.ref('/users/' + userID + '/cities').once('value').then((snapshot) => {
            snapshot.forEach((childSnapshot) => {
              interestedCities.push(childSnapshot.val()); // push each city object to an array of interested cities
              resolve(interestedCities); // send array back to component that called this method
            });
          });
        } else { // case where user has never added a city
          resolve([]);
        }
      });

    });
  }

  setUserInfo(formInfo: any, user: any) {
     const db = firebase.database();
     db.ref('users/' + user.user.uid).set({
       username: formInfo.username,
       email: formInfo.email
     });
   }

   addCityToUserInDatabase(cityInfo: any, userID: string) {
    const db = firebase.database();
    db.ref('users/' + userID + '/cities').push({
      city: cityInfo.city,
      state: cityInfo.state
    });
   }

   removeCityFromUserInDatabase(cityInfo: any, userID: string) {
    return new Promise<any>((resolve, reject) => {
      let keyToDelete: any;
      const citiesRef = firebase.database().ref('users/' + userID + '/cities');
      citiesRef.once('value').then( (snapshot) => {
        snapshot.forEach((childSnapshot) => { // for each city object in user's city list database, compare it to the cityInfo parameter
          if (childSnapshot.val().city  === cityInfo.city && childSnapshot.val().state === cityInfo.state) {
            keyToDelete = childSnapshot.key; // pull key of city object to delete if find match
          }
          citiesRef.child('/' + keyToDelete).remove().then( () => { // delete the key which contains the city info
            resolve(cityInfo); // send back the city that was deleted
          })
            .catch((error) => {
              reject(error); // send an error if failure to delete
            });
        });
      });
    });
   }
}
