import 'angular-material';
import CharacterService from '../character.service';

declare var firebase: any;

class CharacterWeaponsController {

  static $inject: Array<string> = [
    'CharacterService',
    '$mdDialog'
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
  // abilityScores: any[];
  // skillOrder: any;
  // totalHP: number;

  constructor(
    private characterService: CharacterService,
    private $mdDialog: ng.material.IDialogService
    ) {
      this.selected = [];
      this.limit = '5';
      this.page = '1';
      this.count = this.gameData.weapons.length;
      this.search = '';
      // this.abilityScores = abilityScores;
      // this.skillOrder = 'name';
      // this.totalHP = this.character.maxHP + this.character.tempHP;

      this.init();
  }  

  init() {
    // this.count = this.gameData.feats.length;
    this.equipped = {
      equipped: true
    };    
    this.mapWeapons();
  }

  updateCount() {
    let array = this.gameData.weapons;

    array = array.filter((value) => {
      return value.name.toLowerCase().indexOf(this.search) > -1;
    });

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
    this.count = array.length;
  }

  mapWeapons() {
    if(this.character.weapons) {
      this.gameData.weapons.forEach((feat:any, index:number) => {
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
    localStorage.setItem('selectedCharacter', JSON.stringify(this.character));
    this.characterService.updateCharacter(path, property, value);
  }

  showFeatsModal(ev:any, feat:any) {
    // this.$mdDialog.show({
    //   template: `<character-feats-modal feat-name="'${feat.name}'" feat-description="'${feat.description}'" />`,
    //   ariaLabel: 'Character Feats Modal',
    //   parent: angular.element(document.body),
    //   targetEvent: ev,
    //   clickOutsideToClose: true,
    //   locals: {
    //     item: 'testItem'
    //   }
    // })
    // .then(() => {
    //   // this.getCharacters();
    //   // this.$rootScope.$broadcast('CHARACTER_LIST_UPDATED');
    // });
  }

}

export const characterWeaponsComponent = {
  controller: CharacterWeaponsController,
  templateUrl: 'app/pages/character/weapons/weapons.component.html',
  bindings: {
    character: '=',
    gameData: '='
  }
};
