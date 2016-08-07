import 'angular-material';
import * as angular from 'angular';

import CharacterService from '../character.service';
import SpellsService from './spells.service';

class CharacterSpellsController {

  static $inject: Array<string> = [
    '$scope',
    'CharacterService',
    '$mdDialog',
    '$mdMedia',
    'SpellsService',
    '$timeout'
  ];

  character: any;
  selected: any;
  spells: any[];
  gameData: any;
  limit: string;
  page: string;
  count: string;
  known: any;
  filter: any;
  search: string;
  filters: any;
  loaded: boolean;

  // abilityScores: any[];
  // skillOrder: any;
  // totalHP: number;

  constructor(
    private $scope: angular.IScope,
    private characterService: CharacterService,
    private $mdDialog: ng.material.IDialogService,
    private $mdMedia: ng.material.IMedia,
    private spellsService: SpellsService,
    private $timeout: angular.ITimeoutService
    ) {

      if(this.characterService.selectedCharacter) {
        this.init();
      }

      this.$scope.$on('CHARACTER_SELECTED', () => {
        this.init();
      });
  }  

  init() {
    this.limit = '5';
    this.page = '1';

    this.known = {
      known: true
    };

    this.loaded = false;
    this.character = this.characterService.selectedCharacter;    

    this.spellsService.getSpells().then((spells: any[]) => {
      console.log(spells);
      this.spells = spells;
      
      this.mapSpells();

      this.$timeout(() => {
        this.count = this.spells.length.toString();
        this.loaded = true;
      }, 300);

    });
    
  }

  updateCount() {
    let array = this.spells;

    if(this.search && this.search !== '') {
      array = array.filter((value) => {
        return value.name.toLowerCase().indexOf(this.search) > -1;
      });

    }

    for(var i in this.filters) {
      if(typeof this.filters[i] === 'boolean' && this.filters[i]!== '') {
        array = array.filter((value) => {
          return value[i] === this.filters[i];
        });
        console.log(array);
      } else if(typeof this.filters[i] === 'string' && this.filters[i]!== '') {
        array = array.filter((value) => {
          return  value[i].toLowerCase().indexOf(this.filters[i].toLowerCase()) > -1;
        });
      }
    }
    this.count = array.length.toString();
  }

  mapSpells() {
    if(this.character.spells) {
      this.spells.forEach((feat:any, index:number) => {
        for(var i in this.character.spells) {
          if(this.character.spells[i].name === feat.name) {
            feat.known = true;
            return;
          } else {
            feat.known = false;
            // return;
          }
        }
      });
    }
  }

  selectSpell(feat: any) {
    if(!this.character.spells) {
      this.character.spells = [];
    }

    if(feat.known) {
      let update = {
        name: feat.name,
        known: feat.known
      };
      this.character.spells.push(update);
    } else {
      for(var i in this.character.spells) {
        if(this.character.spells[i].name === feat.name) {
          this.character.spells.splice(i, 1);
        }
      }
    }
    this.mapSpells();
    this.updateCharacter('', 'spells', this.character.spells);
  }

  updateCharacter(path: string, property: string, value:any) {
    this.characterService.updateCharacter(path, property, value);
  }

  showSpellsModal(ev:any, spell:any) {
    let useFullScreen = (this.$mdMedia('xs'));
    // let spellName = spell.name;

    spell = angular.copy(spell);
    for(var i in spell) {
      if(typeof spell[i] === 'string') {
        spell[i] = spell[i].replace(/'/g, "`");

      }
    }

    spell = JSON.stringify(spell).replace(/"/g, "\\'");

    this.$mdDialog.show({

      template: `<character-spells-modal spell="'${spell}'" />`,
      ariaLabel: 'Character Spells Modal',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: useFullScreen
    });
  }

}

export const characterSpellsComponent = {
  controller: CharacterSpellsController,
  templateUrl: 'app/character/spells/spells.component.html'
};
