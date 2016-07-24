import 'angular-material';
import * as angular from 'angular';
import CharacterService from './character.service';
import FirebaseService from '../firebase/firebase.service';
import GameDataService from '../firebase/game-data.service';
import ToastService from '../../services/toast.service';

declare var firebase: any;

class CharacterGeneralController {

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
    console.log('general info controller!');
  }
}

export const characterGeneralComponent = {
  controller: CharacterGeneralController,
  templateUrl: 'app/pages/character/components/general-info/general-info.component.html'
};