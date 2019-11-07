export class FirebaseUserModel {
  // This contains info that will be on a user object when you access it from a database.
  username: string;
  email: string;
  // feel free to add fields if you want user to have additional info
  // make sure you have function to update it in database or tell austin to

  constructor() {
    this.username = '';
    this.email = '';
  }
}
