import 'angular-material';
import * as angular from 'angular';
import CharacterService from '../character.service';
// import FirebaseService from '../../firebase/firebase.service';
// import GameDataService from '../../firebase/game-data.service';
// import ToastService from '../../../services/toast.service';

declare var firebase: any;

class CharacterGeneralController {

  static $inject: Array<string> = [
    // 'FirebaseService',
    // 'GameDataService',
    // 'ToastService',
    'CharacterService',
    '$scope',
    '$rootScope',
    // // '$mdDialogOptions',
  ];

  character: any;
  subraces: any[];
  gameData: any;

  constructor(
    // private firebaseService: FirebaseService,
    // private gameDataService: GameDataService,
    // private toastService: ToastService,
    private characterService: CharacterService,
    private $scope: angular.IScope,
    private $rootScope: angular.IRootScopeService
    ) {
      if(this.gameData && this.character) {
        this.getSubraces(this.gameData.races, this.character.race);
      }
  }  

  getSubraces(races: any[], characterRace: string) {
    for(let i in races) {
      if(races[i].name === characterRace) {
        this.subraces = races[i].subraces;
        return;
      } else {
        this.subraces = undefined;
        return;
      }
    }
  }

  updateCharacter(path: string, property: string, value:any) {
    this.characterService.updateCharacter(path, property, value);
    // localStorage.setItem('selectedCharacter', JSON.stringify(this.character));
  }

  updateCharacterName(name: string) {
    this.$rootScope.$broadcast('CHARACTER_NAME_UPDATED', name);
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
