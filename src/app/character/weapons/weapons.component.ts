import 'angular-material';
import * as angular from 'angular';

import CharacterService from '../character.service';
import WeaponsService from './weapons.service';

class CharacterWeaponsController {

  static $inject: Array<string> = [
    '$scope',
    'CharacterService',
    '$mdDialog',
    '$mdMedia',
    'WeaponsService',
    '$timeout'
  ];

  character: any;
  selected: any;
  weapons: any[];
  gameData: any;
  limit: string;
  page: string;
  count: string;
  equipped: any;
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
    private weaponsService: WeaponsService,
    private $timeout: angular.ITimeoutService
    ) {
      // this.selected = [];
      // this.limit = '5';
      // this.page = '1';
      
      // this.search = '';
      // this.abilityScores = abilityScores;
      // this.skillOrder = 'name';
      // this.totalHP = this.character.maxHP + this.character.tempHP;

      // this.init();

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

    this.equipped = {
      equipped: true
    };    

    this.loaded = false;
    this.character = this.characterService.selectedCharacter;    

    this.weaponsService.getWeapons().then((weapons: any[]) => {
      this.weapons = weapons;
      
      this.mapWeapons();

      this.$timeout(() => {
        this.count = this.weapons.length.toString();
        this.loaded = true;
      }, 300);

    });
    
  }

  updateCount() {
    let array = this.weapons;

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

  mapWeapons() {
    if(this.character.weapons) {
      this.weapons.forEach((feat:any, index:number) => {
        for(var i in this.character.weapons) {
          if(this.character.weapons[i].name === feat.name) {
            feat.equipped = true;
            return;
          } else {
            feat.equipped = false;
            // return;
          }
        }
      });
    }
  }

  selectWeapon(feat: any) {
    if(!this.character.weapons) {
      this.character.weapons = [];
    }

    if(feat.equipped) {
      let update = {
        name: feat.name,
        equipped: feat.equipped
      };
      this.character.weapons.push(update);
    } else {
      for(var i in this.character.weapons) {
        if(this.character.weapons[i].name === feat.name) {
          this.character.weapons.splice(i, 1);
        }
      }
    }
    this.mapWeapons();
    this.updateCharacter('', 'weapons', this.character.weapons);
  }

  updateCharacter(path: string, property: string, value:any) {
    // localStorage.setItem('selectedCharacter', JSON.stringify(this.character));
    this.characterService.updateCharacter(path, property, value);
  }

  showWeaponsModal(ev:any, weapon:any) {
    let useFullScreen = (this.$mdMedia('xs'));
    weapon = JSON.stringify(weapon).replace(/"/g, "\\\'");
    console.log(weapon);

    this.$mdDialog.show({
      template: `<character-weapons-modal weapon="'${weapon}'" />`,
    //   template: `<character-weapons-modal weapon="'${{
    // "name": "Club",
    // "type": "weapon",
    // "weaponType": "Simple Melee",
    // "cost": "1 sp",
    // "damage": "1d4",
    // "damageType": "bludgeoning",
    // "weight": "2 lb.",
    // "properties": ["Light"]
    // }}'" />`,
      ariaLabel: 'Character Weapons Modal',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: useFullScreen
    });
  }

}

export const characterWeaponsComponent = {
  controller: CharacterWeaponsController,
  templateUrl: 'app/character/weapons/weapons.component.html'
};
