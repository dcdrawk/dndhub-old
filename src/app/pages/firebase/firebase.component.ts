import 'angular-material';
import FirebaseService from './firebase.service';

class FirebaseController {

  static $inject: Array<string> = ['FirebaseService'];
  firebaseService: any;
  email: string;
  user: Object;

  constructor(firebaseService: FirebaseService) {
    this.firebaseService = firebaseService;
    console.log(firebaseService);
    console.log(this);
  }

  init() {
    console.log('init');
  }

  signIn(email:string, password:string) {

    this.firebaseService.signIn(email, password).then((response) => {
      console.log('sign in completed!');
      console.log(response);
      // this.user = response;
      this.user = angular.extend({}, response);

    });
  }

  signOut() {
    this.firebaseService.signOut().then((response) => {
      this.user = this.firebaseService.currentUser;
      // this.user.displayName.writable = true
    });
  }

  updateProfile() {
    this.firebaseService.updateProfile(this.user);
  }
}

export const firebaseComponent = {
  controller: FirebaseController,
  templateUrl: 'app/pages/firebase/firebase.component.html'
};
