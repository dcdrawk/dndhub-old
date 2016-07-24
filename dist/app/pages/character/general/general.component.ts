import 'angular-material';
import * as angular from 'angular';
// import CharacterService from '../character.service';
// import FirebaseService from '../../firebase/firebase.service';
// import GameDataService from '../../firebase/game-data.service';
// import ToastService from '../../../services/toast.service';

declare var firebase: any;

class CharacterGeneralController {

  static $inject: Array<string> = [
    // 'FirebaseService',
    // 'GameDataService',
    // 'ToastService',
    // 'CharacterService',
    // '$scope',
    // '$rootScope',
    // // '$mdDialogOptions',
  ];

  character: any;

  constructor(
    // private firebaseService: FirebaseService,
    // private gameDataService: GameDataService,
    // private toastService: ToastService,
    // private characterService: CharacterService,
    // private $scope: angular.IScope,
    // private $rootScope: angular.IRootScopeService
    ) {
  }  
}

export const characterGeneralComponent = {
  controller: CharacterGeneralController,
  templateUrl: 'app/pages/character/general/general.component.html',
  bindings: {
    character: '=',
    gameData: '='
  }
};
