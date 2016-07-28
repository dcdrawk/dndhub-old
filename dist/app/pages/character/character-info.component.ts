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
    '$timeout'
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
  charcterListLoaded: any;

  character: any;
  charcterSelected: any;

  constructor(
    private firebaseService: FirebaseService,
    private gameDataService: GameDataService,
    private toastService: ToastService,
    private characterService: CharacterService,
    private $scope: angular.IScope,
    private $rootScope: angular.IRootScopeService,
    private $timeout: angular.ITimeoutService
    ) {
      this.charcterListLoaded = this.$scope.$on('CHARACTER_LIST_LOADED', (event, characters) => {
        this.characters = characters;
        this.character = this.getSelectedCharacter();
      });
      this.$timeout(() => {
        this.init();
      }, 250)
    }  

  init() {
    console.log('character info');
    //Set the game data, if it exists
    if(this.gameDataService.gameData) {
      // this.gameData = this.gameDataService.gameData;
      this.gameData = this.gameDataService.gameData;
    }

    //Set the game data, if it exists
    // this.character = this.getSelectedCharacter();

    if(this.characterService.selectedCharacter) {
      this.character = this.characterService.selectedCharacter;
    }

    this.charcterListLoaded = this.$scope.$on('CHARACTER_LIST_LOADED', (event, characters) => {
      console.log('character info loaded characters');
      this.characters = characters;
      this.character = this.getSelectedCharacter();
    });

    this.charcterSelected = this.$scope.$on('CHARACTER_SELECTED', (event) => {
      console.log('character info character selected!!!!');
      this.character = this.characterService.selectedCharacter;
    });

    this.charcterListLoaded = this.$scope.$on('CHARCTER_LIST_LOADED', (event, characters) => {
      this.characters = characters;
      this.character = this.getSelectedCharacter();
      // console.log('CHARACTER LOADJIOWDAJIOADJWAIODJIOAWJDIAOJDOA');
      // console.log(this.characters);
      // console.log(this.character);
    });
  }

  getSelectedCharacter() {
    if(!localStorage.getItem('selectedCharacterIndex')) {
      return undefined;
    } else {
      return this.characterService.selectedCharacter;
    }
  }
}

declare var onDelete: string;

// const test = '\=\';

export const characterInfoComponent = {
  controller: CharacterInfoController,
  templateUrl: 'app/pages/character/character-info.component.html'
};
