export class FirebaseUserModel {
  // This contains info that will be on a user object when you access it from a database.
  username: string;
  email: string;

  constructor() {
    this.username = '';
    this.email = '';
  }
}
