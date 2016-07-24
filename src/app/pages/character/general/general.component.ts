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
      // console.log(this.character.race);
      // console.log(this.gameData);
      // console.log(this.character.race);
      if(this.gameData && this.character) {
        this.getSubraces(this.gameData.races, this.character.race);
      }
      // this.subraces = ['TEST'];
  }  

  getSubraces(races: any[], characterRace: string) {
    for(var i in races) {
      let race = races[i];
      if(race.name === characterRace) {
        this.subraces = race.subraces;
        return;
      } else {
        this.subraces = undefined;
      }
    }
  }

  updateCharacter(path: string, property: string, value:any){
    this.characterService.updateCharacter(path, property, value);
    localStorage.setItem('selectedCharacter', JSON.stringify(this.character));
  }

  updateCharacterName(name) {
    console.log('update name');
    console.log('name updated!!!!');
    console.log('name updated!!!!');
    this.$rootScope.$broadcast('CHARACTER_NAME_UPDATED', name);
  }

  // selectRace(race: any) {
  //   if(race.subraces) {
  //     this.subraces = race.subraces;
  //   } else {
  //     this.subraces = undefined;
  //   }
  // }
}

export const characterGeneralComponent = {
  controller: CharacterGeneralController,
  templateUrl: 'app/pages/character/general/general.component.html',
  bindings: {
    character: '=',
    gameData: '='
  }
};
