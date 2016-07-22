import * as angular from 'angular';
import 'angular-material';
import FirebaseService from './firebase.service';
import 'angular-ui-router';

class FirebaseController {

  static $inject: Array<string> = ['FirebaseService', '$scope', '$state'];
  firebaseService: any;
  email: string;
  user: Object;
  userSignedIn: any;
  signingIn: boolean;
  constructor(
    firebaseService: FirebaseService,
    private $scope: angular.IScope,
    private $state: ng.ui.IStateService
  ) {
    this.firebaseService = firebaseService;
    this.userSignedIn = this.$scope.$on('USER_SIGNED_IN', (event, user) => {
      this.user = angular.extend({}, user);
      this.$scope.$apply();
    });
  }

  init() {
    console.log('init');
  }

  signIn(email:string, password:string) {
    this.signingIn = true;
    this.firebaseService.signIn(email, password).then((response) => {
      this.signingIn = false;
      this.user = angular.extend({}, response);
      this.$state.go('profile');
    });
  }

  signOut() {
    this.firebaseService.signOut().then((response) => {
      this.user = this.firebaseService.currentUser;
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
