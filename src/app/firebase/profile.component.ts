import 'angular-material';
import * as angular from 'angular';
import FirebaseService from './firebase.service';
import ToastService from '../services/toast.service';

class ProfileController {

  static $inject: Array<string> = ['FirebaseService', 'ToastService', '$scope'];
  firebaseService: any;
  toastService: any;
  email: string;
  user: Object;
  userSignedIn: any;
  
  constructor(
    firebaseService: FirebaseService,
    toastService: ToastService,
    private $scope: angular.IScope
    ) {

    this.toastService = toastService;
    this.firebaseService = firebaseService;

    this.userSignedIn = this.$scope.$on('USER_SIGNED_IN', (event, user) => {
      this.user = angular.extend({}, user);
      this.$scope.$apply();
    });

    this.init();
  }  

  init() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.user = this.firebaseService.getCurrentUser();
  }

  updateProfile() {
    this.firebaseService.updateProfile(this.user).then(() => {
      this.toastService.showToast('Profile Updated');
    });    
  }

  uploadFile(file:any) {
    this.firebaseService.uploadProfilePhoto(file).then(() => {
      this.getCurrentUser();
    });
  }
  
}

export const profileComponent = {
  controller: ProfileController,
  templateUrl: 'app/firebase/profile.component.html'
};

