import 'angular-material';
import * as angular from 'angular';
import FirebaseService from '../firebase/firebase.service';
import GameDataService from '../firebase/game-data.service';
import ToastService from '../../services/toast.service';

declare var firebase: any;

class CharacterListController {

  static $inject: Array<string> = ['FirebaseService', 'GameDataService','ToastService', '$scope', '$mdDialog'];

  test: any;
  selected: any;
  userId: any;
  user: any;
  characters: any[];
  myOrder: any;
  gameData: any;
  userSignedIn: any;
  gameDataLoaded: any;

  private firebaseService: any;
  private gameDataService: any;
  private toastService: any;
  

  constructor(
    firebaseService: FirebaseService,
    gameDataService: GameDataService,
    toastService: ToastService,
    private $scope: angular.IScope,
    private $mdDialog: ng.material.IDialogService
    ) {

    // console.log('character list ctrl');

    this.selected = [];
    this.gameDataService = gameDataService;
    this.toastService = toastService;
    this.firebaseService = firebaseService;

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
    var userId = firebase.auth().currentUser.uid;
    var url = 'characters/' + userId;
    this.firebaseService.getData(url).then((characters) => {
      //Map the character object to an array, including the id/key of the character
      //Knowing the id/key will allow us to update/delete it in the future
      this.characters = Object.keys(characters).map(function (key:string) {
        let id = 'id';
        characters[key][id] = key;
        return characters[key];
      });
      //Set characters in local storage
      localStorage.setItem('characters', JSON.stringify(this.characters));
    });
  }

  deleteCharacter(character:any) {
    this.firebaseService.deleteCharacter(character).then(() => {
      this.getCharacters();
    });
  }

  showNewCharacterModal(ev:any) {
    this.$mdDialog.show({
      templateUrl: './app/pages/character/new-character.modal.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals: {
        gameData: this.gameData
      },
      controller($scope:any, $mdDialog: ng.material.IDialogService, gameData:any) {
          $scope.gameData = gameData;
          $scope.selectRace = (race) => {
            if(race.subraces) {
              $scope.subraces = race.subraces;
            } else {
              $scope.subraces = undefined;
            }
          };
          $scope.saveCharacter = (character) => {
            $mdDialog.hide(character);
          };
          $scope.close = () => {
            $mdDialog.hide();
          };
      }
    })
    .then((character) => {
      //Save the new character
      this.firebaseService.saveNewCharacter(character).then(() => {
        this.getCharacters();
      });
    }, () => {
      //Cancelled Dialog
    });
  }
}

export const characterListComponent = {
  controller: CharacterListController,
  templateUrl: 'app/pages/character/character-list.component.html'
};
