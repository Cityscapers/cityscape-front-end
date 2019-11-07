export class FirebaseUserCitiesModel {
  // This is the structure of each city object in the Firebase database.
  city: string;
  state: string;

  constructor() {
    this.city = '';
    this.state = '';
  }
}
