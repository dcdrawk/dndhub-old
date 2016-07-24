import 'angular-material';
import * as angular from 'angular';
import CharacterService from '../character.service';
// import FirebaseService from '../../firebase/firebase.service';
// import GameDataService from '../../firebase/game-data.service';
// import ToastService from '../../../services/toast.service';

declare var firebase: any;

const abilityScores = [{
  name: 'Strength'
  },{
  name: 'Dexterity'
  },{
  name: 'Constitution'
  },{
  name: 'Intelligence'
  },{
  name: 'Wisdom'
  },{
  name: 'Charisma'
}];

class CharacterStatsController {

  static $inject: Array<string> = [
    // 'FirebaseService',
    // 'GameDataService',
    // 'ToastService',
    'CharacterService',
    // '$scope',
    // '$rootScope',
    // // '$mdDialogOptions',
  ];

  character: any;
  selected: any;
  abilityScores: any[];
  skillOrder: any;

  constructor(
    // private firebaseService: FirebaseService,
    // private gameDataService: GameDataService,
    // private toastService: ToastService,
    private characterService: CharacterService
    // private $scope: angular.IScope,
    // private $rootScope: angular.IRootScopeService
    
    ) {
      this.selected = [];
      this.abilityScores = abilityScores;
      this.skillOrder = 'name';
  }  

  updateCharacter(path: string, property: string, value:any){
    this.characterService.updateCharacter(path, property, value);
    localStorage.setItem('selectedCharacter', JSON.stringify(this.character));
  }
}

export const characterStatsComponent = {
  controller: CharacterStatsController,
  templateUrl: 'app/pages/character/stats/stats.component.html',
  bindings: {
    character: '=',
    gameData: '='
  }
};
