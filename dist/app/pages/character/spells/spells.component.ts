import 'angular-material';
import CharacterService from '../character.service';

declare var firebase: any;

class CharacterSpellsController {

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
      console.log(this.gameData);

      this.count = this.gameData.spells.length;
      this.search = '';
      // this.abilityScores = abilityScores;
      // this.skillOrder = 'name';
      // this.totalHP = this.character.maxHP + this.character.tempHP;

      this.init();
  }  

  init() {
    // this.count = this.gameData.feats.length;
    // this.equipped = {
    //   equipped: true
    // };
    this.mapSpells();
  }

  updateCount() {
    let array = this.gameData.spells;

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

  mapSpells() {
    if(this.character.spells) {
      this.gameData.spells.forEach((spell:any, index:number) => {
        for(var i in this.character.spells) {
          if(this.character.spells[i].name === spell.name) {
            spell.known = true;
            return;
          } else {
            spell.known = false;
            // return;
          }
        }
      });
    }
  }

  selectSpell(spell: any) {
    if(!this.character.spells) {
      this.character.spells = [];
    }

    if(spell.known) {
      let update = {
        name: spell.name,
        known: spell.known
      };
      this.character.spells.push(update);
    } else {
      for(var i in this.character.spells) {
        if(this.character.spells[i].name === spell.name) {
          this.character.spells.splice(i, 1);
        }
      }
    }
    this.mapSpells();
    this.updateCharacter('', 'spells', this.character.spells);
  }

  updateCharacter(path: string, property: string, value:any) {
    localStorage.setItem('selectedCharacter', JSON.stringify(this.character));
    this.characterService.updateCharacter(path, property, value);
  }

  // showFeatsModal(ev:any, feat:any) {
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
  // }

}

export const characterSpellsComponent = {
  controller: CharacterSpellsController,
  templateUrl: 'app/pages/character/spells/spells.component.html',
  bindings: {
    character: '=',
    gameData: '='
  }
};
