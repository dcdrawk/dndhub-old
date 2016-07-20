import 'angular-material';
import FirebaseService from '../pages/firebase/firebase.service';

interface IMenuModel {
    // menuItems: app.layout.IMenuItems[];
    toggleSidenav(menuId: string): void;
}

class HeaderController implements IMenuModel {

  static $inject: Array<string> = ['FirebaseService', '$mdSidenav', '$scope'];
  user: any;
  firebaseService: any;

  constructor(
    firebaseService: FirebaseService,
    private $mdSidenav: ng.material.ISidenavService,
    private $scope: ng.IScope  
    ) {

    this.firebaseService = firebaseService;

    var userSignedOut = this.$scope.$on('USER_SIGNED_OUT', (event) => {
      this.user = undefined;
      this.$scope.$apply();
    });

    var userSignedIn = this.$scope.$on('USER_SIGNED_IN', (event, user) => {
      this.user = angular.extend({}, user);
      this.$scope.$apply();
    });

    var userUpdated = this.$scope.$on('USER_UPDATED', (event, user) => {
      this.user = user;
      this.$scope.$apply();
    });
  }

// this.openMenu = function($mdOpenMenu, ev) {
//       originatorEv = ev;
//       $mdOpenMenu(ev);
//     };  

  openMenu($mdOpenMenu, ev) {
    // originatorEv = ev;
    console.log('open da menu');
    $mdOpenMenu(ev);
  }

  clickMenu() {
    console.log('clicked the menu');
  }

  toggleMenu(menuId: string) {
    var test = $(menuId).find('ul');
    $(test).slideToggle( 'fast' );
  }

  toggleSidenav(menuId: string) {
    this.$mdSidenav(menuId).toggle();
        console.log(menuId);
  }

  signOut() {
    this.firebaseService.signOut().then((response) => {
      this.user = this.firebaseService.currentUser;
      // this.user.displayName.writable = true
    });
  }
}

export const header = {
  controller: HeaderController,
  templateUrl: 'app/layout/header.html'
};
