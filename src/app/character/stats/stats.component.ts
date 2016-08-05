import 'angular-material';
import * as angular from 'angular';

import CharacterService from '../character.service';
import StatsService from './stats.service';

declare var firebase: any;
declare var statsService: any;

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
    'CharacterService',
    'StatsService',
    '$scope',
    '$timeout',
  ];

  character: any;
  selected: any;
  abilityScores: any[];
  skillOrder: any;
  totalHP: number;
  skills: any[];
  show: boolean;
  constructor(
    private characterService: CharacterService,
    private statsService: StatsService,
    private $scope: angular.IScope,
    private $timeout: angular.ITimeoutService
    
  ) {
    this.abilityScores = abilityScores;
    this.skillOrder = 'name';

    this.statsService.getSkills().then((skills: any[]) => {
      this.skills = skills;
    });
    
    if(this.characterService.selectedCharacter) {
      this.character = this.characterService.selectedCharacter;
      this.totalHP = this.character.maxHP + this.character.tempHP;
    }

    this.$scope.$on('CHARACTER_SELECTED', () => {
      this.character = this.characterService.selectedCharacter;
      this.totalHP = this.character.maxHP + this.character.tempHP;
    });
  }

  updateCharacter(path: string, property: string, value:any) {
    this.characterService.updateCharacter(path, property, value);
  }

  updateTotalHP() {
    this.totalHP = this.character.maxHP + this.character.tempHP;
  }
}

export const characterStatsComponent = {
  controller: CharacterStatsController,
  templateUrl: 'app/character/stats/stats.component.html'
};
