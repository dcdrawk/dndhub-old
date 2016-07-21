import 'angular-material';
import FirebaseService from './firebase.service';

class SignUpController {

  static $inject: Array<string> = ['FirebaseService'];
  firebaseService: any;
  email: string;
  password: string;

  user: Object;

  constructor(firebaseService: FirebaseService) {
    this.firebaseService = firebaseService;
  }

  init() {
    console.log('init');
  }

  signUp() {
    this.firebaseService.signUp(this.email, this.password);
  }
}

export const signUpComponent = {
  controller: SignUpController,
  templateUrl: 'app/pages/firebase/sign-up.component.html'
};
