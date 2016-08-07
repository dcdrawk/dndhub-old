import * as angular from 'angular';
import 'angular-material';
import FirebaseService from './firebase.service';

class SignUpController {

  static $inject: Array<string> = ['FirebaseService', '$scope', '$state'];
  firebaseService: any;
  email: string;
  password: string;

  user: Object;

  constructor(
    firebaseService: FirebaseService,
    private $scope: angular.IScope,
    private $state: ng.ui.IStateService
  ) {
    this.firebaseService = firebaseService;
  }

  init() {
    console.log('init');
  }

  signUp() {
    this.firebaseService.signUp(this.email, this.password).then(() => {
      this.$state.go('profile');
    });
  }
}

export const signUpComponent = {
  controller: SignUpController,
  templateUrl: 'app/firebase/sign-up.component.html'
};
