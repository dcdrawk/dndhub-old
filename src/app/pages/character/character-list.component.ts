import 'angular-material';
import * as angular from 'angular';
import FirebaseService from '../firebase/firebase.service';
import ToastService from '../../services/toast.service';
declare var firebase: any;

const desserts = [{
  name: 'pie',
  calories: '50'
},{
  name: 'cake',
  calories: '100'  
}]



class CharacterListController {

  static $inject: Array<string> = ['FirebaseService', 'ToastService', '$scope', '$mdDialog'];
  private firebaseService: any;
  toastService: any;
  desserts: any[];
  test: any;
  selected: any;
  userId: any;
  user: any;
  characters: any[];
  myOrder: any;
  constructor(
    firebaseService: FirebaseService,
    toastService: ToastService,
    private $scope: angular.IScope,
    private $mdDialog: ng.material.IDialogService
    ) {

    var userSignedIn = this.$scope.$on('USER_SIGNED_IN', (event, user) => {
      // this.user = angular.extend({}, user);
      // this.$scope.$apply();
      this.getCharacters();
    });

    this.selected = [];
    this.desserts = desserts;
    this.toastService = toastService;
    this.firebaseService = firebaseService;    
    // this.userId = firebase.auth().currentUser.uid;
    this.init();
    // this.test = 'lol';
  }  

  init() {

    if(firebase.auth().currentUser) {
      this.userId = firebase.auth().currentUser.uid;
      if(this.userId) {
        this.getCharacters();      
      }
    }
  }

  showAlert(ev) {
    this.$mdDialog.show(
      this.$mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('This is an alert title')
        .textContent('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
    );
  }

  getCharacters() {
    console.log('get the characters');
    var userId = firebase.auth().currentUser.uid;
    var url = 'characters/' + userId;
    this.firebaseService.getData(url).then((characters) => {
      this.characters = Object.keys(characters).map(function (key) {return characters[key]});
    });
  }

  showNewCharacterModal(ev) {
    this.$mdDialog.show({
      templateUrl: './app/pages/character/new-character.modal.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      controller($scope, $mdDialog: ng.material.IDialogService) {

          $scope.saveCharacter = (character) => {
            console.log('save character');
            $mdDialog.hide(character);
          }
          $scope.close = () => {
              $mdDialog.hide();
          }
      }
    })
    .then((character) => {
      //Save the new character
      this.firebaseService.saveNewCharacter(character).then(() => {
        this.getCharacters()
      });
    }, () => {
      //Cancelled Dialog
    });
  }

  answer() {
    console.log('ANSWER DAMNIT');
    this.$mdDialog.hide('answer');
  }
}

export class DialogController {
  static $inject: Array<string> = ['FirebaseService', '$mdDialog'];
  firebaseService: any;

  constructor(
    // firebaseService: FirebaseService,
    private $mdDialog: ng.material.IDialogService
    ) {
  }  

  hide() {
    console.log('ANSWER DAMNIT');
    this.$mdDialog.hide();
  }

  cancel() {
    console.log('ANSWER DAMNIT');
    this.$mdDialog.cancel();
  }
  answer() {
    console.log('ANSWER DAMNIT');
    this.$mdDialog.hide('answer');
  }

}

export const characterListComponent = {
  controller: CharacterListController,
  templateUrl: 'app/pages/character/character-list.component.html'
};

