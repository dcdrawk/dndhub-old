import 'angular-material';
import * as angular from 'angular';

import CharacterService from '../character.service';
import ArmorsService from './armor.service';

class CharacterArmorsController {

  static $inject: Array<string> = [
    '$scope',
    'CharacterService',
    '$mdDialog',
    '$mdMedia',
    'ArmorService',
    '$timeout'
  ];

  character: any;
  selected: any;
  armor: any[];
  gameData: any;
  limit: string;
  page: string;
  count: string;
  equipped: any;
  filter: any;
  search: string;
  filters: any;
  loaded: boolean;

  constructor(
    private $scope: angular.IScope,
    private characterService: CharacterService,
    private $mdDialog: ng.material.IDialogService,
    private $mdMedia: ng.material.IMedia,
    private armorService: ArmorsService,
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

    this.equipped = {
      equipped: true
    };    

    this.loaded = false;
    this.character = this.characterService.selectedCharacter;    

    this.armorService.getArmor().then((armor: any[]) => {
      this.armor = armor;
      
      this.mapArmor();

      this.$timeout(() => {
        this.count = this.armor.length.toString();
        this.loaded = true;
      }, 300);

    });
    
  }

  updateCount() {
    let array = this.armor;

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
      } else if(typeof this.filters[i] === 'string' && this.filters[i]!== '') {
        array = array.filter((value) => {
          return  value[i].toLowerCase().indexOf(this.filters[i].toLowerCase()) > -1;
        });
      }
    }
    this.count = array.length.toString();
  }

  mapArmor() {
    if(this.character.armor) {
      this.armor.forEach((feat:any, index:number) => {
        for(var i in this.character.armor) {
          if(this.character.armor[i].name === feat.name) {
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

  selectArmor(feat: any) {
    if(!this.character.armor) {
      this.character.armor = [];
    }

    if(feat.equipped) {
      let update = {
        name: feat.name,
        equipped: feat.equipped
      };
      this.character.armor.push(update);
    } else {
      for(var i in this.character.armor) {
        if(this.character.armor[i].name === feat.name) {
          this.character.armor.splice(i, 1);
        }
      }
    }
    this.mapArmor();
    this.updateCharacter('', 'armor', this.character.armor);
  }

  updateCharacter(path: string, property: string, value:any) {
    // localStorage.setItem('selectedCharacter', JSON.stringify(this.character));
    this.characterService.updateCharacter(path, property, value);
  }

  showArmorModal(ev:any, armor:any) {
    let useFullScreen = (this.$mdMedia('xs'));
    armor = JSON.stringify(armor).replace(/"/g, '\\\'');
    this.$mdDialog.show({
      template: `<character-armor-modal armor="'${armor}'" />`,
      ariaLabel: 'Character Armor Modal',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: useFullScreen
    });
  }

}

export const characterArmorComponent = {
  controller: CharacterArmorsController,
  templateUrl: 'app/character/armor/armor.component.html'
};
