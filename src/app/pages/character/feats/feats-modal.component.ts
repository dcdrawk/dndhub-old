import 'angular-material';
import * as angular from 'angular';
// import CharacterService from '../character.service';
// import FirebaseService from '../../firebase/firebase.service';
// import GameDataService from '../../firebase/game-data.service';
// import ToastService from '../../../services/toast.service';

declare var firebase: any;

class CharacterFeatsModalController {

  static $inject: Array<string> = [
    // 'FirebaseService',
    // 'GameDataService',
    // 'ToastService',
    // 'CharacterService',
    // '$scope',
    '$mdDialog',
    '$sce'
    // '$rootScope',
  ];

  // test: any;
  // selected: any;
  // userId: any;
  // user: any;
  // characters: any[];
  // myOrder: any;
  // gameData: any;
  // userSignedIn: any;
  // gameDataLoaded: any;
  // subraces: any[];
  // saving: boolean;
  // character: any;
  feat: any;
  test: any;


  featName: any;
  featDescription: any;
  name: any;
  description: any;

  constructor(
    // private firebaseService: FirebaseService,
    // private gameDataService: GameDataService,
    // private toastService: ToastService,
    // private characterService: CharacterService,
    // private $scope: angular.IScope,
    private $mdDialog: ng.material.IDialogService,
    private $sce: angular.ISCEService
    // private $rootScope: angular.IRootScopeService
    // item: any
    ) {

    this.name = this.$sce.trustAsHtml(angular.extend(this.featName));    
    this.description = this.$sce.trustAsHtml(angular.extend(this.featDescription));

    this.init();
  }

  init() {
    console.log(this);
    //Set the game data, if it exists
    // if(this.gameDataService.gameData) {
    //   this.gameData = this.gameDataService.gameData;
    // }
  }

  close() {
    this.$mdDialog.cancel();
  }

  // selectRace(race: any) {
  //   if(race.subraces) {
  //     this.subraces = race.subraces;
  //   } else {
  //     this.subraces = undefined;
  //   }
  // }

  // saveCharacter(character: any) {
  //   this.saving = true;
  //   this.characterService.saveNewCharacter(character);
  //   this.$mdDialog.hide();
  // }
}

export const characterFeatsModalComponent = {
  controller: CharacterFeatsModalController,
  templateUrl: 'app/pages/character/feats/feats-modal.component.html',
  bindings: {
    featName: '=',
    featDescription: '='
  }
};
