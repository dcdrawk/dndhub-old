import 'angular-material';
import * as angular from 'angular';
import CharacterService from './character.service';
import FirebaseService from '../firebase/firebase.service';
import GameDataService from '../firebase/game-data.service';
import ToastService from '../../services/toast.service';

declare var firebase: any;

class CharacterInfoController {

  static $inject: Array<string> = [
    'FirebaseService',
    'GameDataService',
    'ToastService',
    'CharacterService',
    '$scope',
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

  character: any;
  charcterSelected: any;

  constructor(
    private firebaseService: FirebaseService,
    private gameDataService: GameDataService,
    private toastService: ToastService,
    private characterService: CharacterService,
    private $scope: angular.IScope,
    private $rootScope: angular.IRootScopeService
    ) {

    this.init();
  }  

  init() {

    //Set the game data, if it exists
    if(this.gameDataService.gameData) {
      this.gameData = this.gameDataService.gameData;
    }

    //Set the game data, if it exists
    this.character = this.getSelectedCharacter();

    this.charcterSelected = this.$scope.$on('CHARACTER_SELECTED', (event) => {
      this.character = this.characterService.selectedCharacter;
    });
  }

  getSelectedCharacter() {
    if(!localStorage.getItem('selectedCharacter')) {
      return undefined;
    } else {
      return JSON.parse(localStorage.getItem('selectedCharacter'));
    }
  }
}

declare var onDelete: string;

// const test = '\=\';

export const characterInfoComponent = {
  controller: CharacterInfoController,
  templateUrl: 'app/pages/character/character-info.component.html'
};
