import 'angular-material';
import * as angular from 'angular';
import CharacterService from './character.service';
import FirebaseService from '../firebase/firebase.service';
import GameDataService from '../firebase/game-data.service';
import ToastService from '../../services/toast.service';

declare var firebase: any;

class CharacterListController {

  static $inject: Array<string> = [
    'FirebaseService',
    'GameDataService',
    'ToastService',
    'CharacterService',
    '$scope',
    '$mdDialog',
    '$rootScope',
    // '$mdDialogOptions',
  ];

  test: any;
  selected: any;
  userId: any;
  user: any;
  characters: any[];
  myOrder: any;
  gameData: any;
  userSignedIn: any;
  gameDataLoaded: any;

  constructor(
    private firebaseService: FirebaseService,
    private gameDataService: GameDataService,
    private toastService: ToastService,
    private characterService: CharacterService,
    private $scope: angular.IScope,
    private $mdDialog: ng.material.IDialogService,
    private $rootScope: angular.IRootScopeService
    // private $mdDialogOptions: ng.material.IDialogOptions
    ) {

    //If it detects a user has signed in, get the characters for that user
    this.userSignedIn = this.$scope.$on('USER_SIGNED_IN', (event, user) => {
      //Check if characters are in local storage
      if(!localStorage.getItem('characters')) {
        this.getCharacters();
      } else {
        //Get characters from local storage
        this.characters = JSON.parse(localStorage.getItem('characters'));
      }
    });

    //Listen if the game data loads...
    this.gameDataLoaded = this.$scope.$on('GAME_DATA_LOADED', (event) => {
      this.gameData = this.gameDataService.gameData;
      this.$scope.$apply();
    });

    //Set the game data, if it exists
    if(this.gameDataService.gameData) {
      this.gameData = this.gameDataService.gameData;
    }

    this.init();
  }  

  init() {
    if(firebase.auth().currentUser) {
      this.userId = firebase.auth().currentUser.uid;
      if(this.userId) {
        //If characters dont exist in local storage, get them!
        if(!localStorage.getItem('characters')) {
          this.getCharacters();
        } else {
          this.characters = JSON.parse(localStorage.getItem('characters'));
        }
      }
    }
  }

  //Show the confirm delete dialog
  showConfirmDeleteDialog(ev:any, character:any, index:any) {
    var confirm = this.$mdDialog.confirm()
          .title('Confirm Character Delete')
          .textContent('Are you sure you want to to this?')
          .ariaLabel('Confirm Delete')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');
    this.$mdDialog.show(confirm).then(() => {
      console.log('confirm delete');
      this.characters.splice(index, 1);
      this.deleteCharacter(character);
    }, () => {
      console.log('cancel delete');
    });
  }

  //Get the list of characters
  getCharacters() {
    this.characterService.getCharacters().then((characters:any[]) => {
      this.characters = characters;
    });
  }


  deleteCharacter(character:any) {
    this.firebaseService.deleteCharacter(character).then(() => {
      this.$rootScope.$broadcast('CHARACTER_LIST_UPDATED');
      this.getCharacters();
    });
  }

  showNewCharacterModal(ev:any) {
    this.$mdDialog.show({
      template: '<new-character-modal/>',
      ariaLabel: 'New Character Dialog',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    })
    .then(() => {
      this.getCharacters();
      this.$rootScope.$broadcast('CHARACTER_LIST_UPDATED');
    });
  }
}

export const characterListComponent = {
  controller: CharacterListController,
  templateUrl: 'app/pages/character/character-list.component.html'
};
