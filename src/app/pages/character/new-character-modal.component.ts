import 'angular-material';
import * as angular from 'angular';
import CharacterService from './character.service';
import FirebaseService from '../firebase/firebase.service';
import GameDataService from '../firebase/game-data.service';
import ToastService from '../../services/toast.service';

declare var firebase: any;

class NewCharacterModalController {

  static $inject: Array<string> = [
    'FirebaseService',
    'GameDataService',
    'ToastService',
    'CharacterService',
    '$scope',
    '$mdDialog',
    '$rootScope',
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
  subraces: any[];
  saving: boolean;
  character: any;

  constructor(
    private firebaseService: FirebaseService,
    private gameDataService: GameDataService,
    private toastService: ToastService,
    private characterService: CharacterService,
    private $scope: angular.IScope,
    private $mdDialog: ng.material.IDialogService,
    private $rootScope: angular.IRootScopeService
    ) {

    this.init();
  }

  init() {
    //Set the game data, if it exists
    if(this.gameDataService.gameData) {
      this.gameData = this.gameDataService.gameData;
    }

    // this.character = {
    //   abilityScores: [{

    //   }]
    // };
  }

  close() {
    this.$mdDialog.cancel();
  }

  selectRace(race: any) {
    if(race.subraces) {
      this.subraces = race.subraces;
    } else {
      this.subraces = undefined;
    }
  }

  saveCharacter(character: any) {
    this.saving = true;
    this.characterService.saveNewCharacter(character);
    this.$mdDialog.hide();
  }
}

export const newCharacterModalComponent = {
  controller: NewCharacterModalController,
  templateUrl: 'app/pages/character/new-character-modal.component.html'
};
