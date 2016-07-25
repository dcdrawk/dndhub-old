import 'angular-material';
import * as angular from 'angular';

import CharacterService from '../character.service';

declare var firebase: any;

class CharacterFeatsController {

  static $inject: Array<string> = [
    'CharacterService',
    '$mdDialog'
  ];

  character: any;
  selected: any;
  feats: any;
  gameData: any;
  limit: string;
  page: string;
  count: string;
  known: any;
  filter: any;
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

      // this.abilityScores = abilityScores;
      // this.skillOrder = 'name';
      // this.totalHP = this.character.maxHP + this.character.tempHP;

      this.init();
  }  

  init() {
    // this.count = this.gameData.feats.length;
    this.known = {
      known: true
    };    
    this.mapFeats();
  }

  changeFilter(filter: any) {
    console.log('changeFilter');
    switch (filter) {
      case 'known':
        this.filter = {
          known: true
        }
        break;    
      case 'unknown':
        this.filter = {
          known: false
        }
        break; 
      default:
        this.filter = undefined
        break;
    }
  }

  mapFeats() {
    if(this.character.feats) {
      this.gameData.feats.forEach((feat:any, index:number) => {
        for(var i in this.character.feats) {
          if(this.character.feats[i].name === feat.name) {
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

  selectFeat(feat: any) {
    if(!this.character.feats) {
      this.character.feats = [];
    }

    if(feat.known) {
      let update = {
        name: feat.name,
        known: feat.known
      }
      this.character.feats.push(update);
    } else {
      for(var i in this.character.feats) {
        if(this.character.feats[i].name == feat.name) {
          this.character.feats.splice(i, 1);
        }
      }
    }
    this.mapFeats();

    console.log(this.character.feats);

    // for(var i in this.character.feats) {
    //   if(this.character.feats[i].name == feat.name) {

    //   }
    // }
    // if(feat.known) {

    //   if(this.character.feats) {

    //   } else {
    //     this.character.feats = [];
    //   }
    // }
    
    // let update = {
    //   name: feat.name,
    //   known: feat.known
    // }
    this.updateCharacter('', 'feats', this.character.feats);
  }

  updateCharacter(path: string, property: string, value:any) {
    localStorage.setItem('selectedCharacter', JSON.stringify(this.character));
    this.characterService.updateCharacter(path, property, value);
  }

  showFeatsModal(ev:any, feat:any) {
    console.log(feat);
    this.$mdDialog.show({

      // template: '<character-feats-modal feat="' + this.gameData.feats + '"/>',
      // template: `<character-feats-modal feat-name="'${feat.name}'" feat-description="'${feat.description}'" />`,
      template: `<character-feats-modal feat-name="'${feat.name}'" feat-description="'${feat.description}'" />`,
      ariaLabel: 'Character Feats Modal',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {
        item: 'testItem'
      }
    })
    .then(() => {
      // this.getCharacters();
      // this.$rootScope.$broadcast('CHARACTER_LIST_UPDATED');
    });
  }

}

export const characterFeatsComponent = {
  controller: CharacterFeatsController,
  templateUrl: 'app/pages/character/feats/feats.component.html',
  bindings: {
    character: '=',
    gameData: '='
  }
};
