import 'angular-material';
import FirebaseService from '../firebase/firebase.service';

declare var angular: any;

interface IMenuModel {
    toggleSidenav(menuId: string): void;
}

class HeaderController implements IMenuModel {

  static $inject: Array<string> = ['FirebaseService', '$mdSidenav', '$scope'];
  user: any;
  firebaseService: any;
  userSignedOut: any;
  userSignedIn: any;
  userUpdated: any;

  constructor(
    firebaseService: FirebaseService,
    private $mdSidenav: ng.material.ISidenavService,
    private $scope: ng.IScope  
    ) {

    this.firebaseService = firebaseService;

    //Listen if the user signs out
    this.userSignedOut = this.$scope.$on('USER_SIGNED_OUT', (event) => {
      this.user = undefined;
      this.$scope.$apply();
    });

    //Listen if the user signs in
    this.userSignedIn = this.$scope.$on('USER_SIGNED_IN', (event, user) => {
      this.user = angular.extend({}, user);
      this.$scope.$apply();
    });

    //Listen if the user is updated
    this.userUpdated = this.$scope.$on('USER_UPDATED', (event, user) => {
      this.user = user;
      this.$scope.$apply();
    });
  }

  //Open the top right menu
  openMenu($mdOpenMenu:any, ev:any) {
    $mdOpenMenu(ev);
  }

  //Toggle the sidenav
  toggleSidenav(menuId: string) {
    this.$mdSidenav(menuId).toggle();
        console.log(menuId);
  }

  //Sign the user out
  signOut() {
    this.firebaseService.signOut().then((response) => {
      this.user = this.firebaseService.currentUser;
    });
  }
}

export const header = {
  controller: HeaderController,
  templateUrl: 'app/layout/header.html'
};
