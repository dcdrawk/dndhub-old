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
  races: any[];
  proficiencyBonus: number;

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

    this.statsService.getRaces().then((races: any[]) => {
      this.races = races;
      this.getSpeed();
    });
    
    if(this.characterService.selectedCharacter) {
      this.init();
    }

    this.$scope.$on('CHARACTER_SELECTED', () => {
      this.init();
    });
  }

  init() {
    this.character = this.characterService.selectedCharacter;
    this.totalHP = this.character.maxHP + this.character.tempHP;

    if(typeof this.character.proficiencyBonusLock === 'undefined') {
      this.character.proficiencyBonusLock = true;
    }

    if(typeof this.character.initiativeLock === 'undefined') {
      this.character.initiativeLock = true;
    }

    if(typeof this.character.speedLock === 'undefined') {
      this.character.speedLock = true;
    }

    // if(this.character.proficiencyBonusLock) {
    //   this.character.proficiencyBonus = this.getProficiencyBonus(this.character.level);
    // }

    
    this.getProficiencyBonus();

    this.getInitiative();
    
    

  }

  getProficiencyBonus() {
    if(this.character.proficiencyBonusLock) {
      this.character.proficiencyBonus = Math.ceil(parseInt(this.character.level)/4+1);
    }
  }

  getInitiative() {
    if(this.character.initiativeLock) {
      this.character.initiative = this.getAbilityScoreModifier(
        this.character.abilityScores.Dexterity.base + 
        this.character.abilityScores.Dexterity.bonus
      );
    }
  }

  getSpeed() {
    if(this.character.speedLock) {
      this.races.forEach((race) => {
        if(this.character.race === race.name) {
          this.character.speed = +race.speed;
        }
      });
    }
  }

  getAbilityScoreModifier(score) {
    return Math.floor((parseInt(score) / 2 - 5));
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
