import 'angular-material';
import * as angular from 'angular';

import CharacterService from '../character.service';
import FeatsService from './feats.service';

declare var featsService: any;

class CharacterFeatsController {

  static $inject: Array<string> = [
    '$scope',
    'CharacterService',
    '$mdDialog',
    '$mdMedia',
    'FeatsService',
    '$timeout'
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
  search: string;
  loaded: boolean;

  constructor(
    private $scope: angular.IScope,
    private characterService: CharacterService,
    private $mdDialog: ng.material.IDialogService,
    private $mdMedia: ng.material.IMedia,
    private featsService: FeatsService,
    private $timeout: angular.ITimeoutService
    ) {
      // this.selected = [];
      // this.limit = '5';
      // this.page = '1';
      // this.count = this.feats.length;

      if(this.characterService.selectedCharacter) {
        this.init();
      }

      this.$scope.$on('CHARACTER_SELECTED', () => {
        this.init();
      });
      // this.init();
  }  

  init() {
    this.limit = '5';
    this.page = '1';

    this.known = {
      known: true
    };

    this.loaded = false;
    this.character = this.characterService.selectedCharacter;    

    this.featsService.getFeats().then((feats) => {
      this.feats = feats;
      this.count = this.feats.length;
      this.mapFeats();

      this.$timeout(() => {
        this.loaded = true;
      }, 300);

    });
    
  }

  changeFilter(filter: any) {
    if(this.feats) {
      switch (filter) {
        case 'known':
          this.filter = {
            known: true
          };
          //Set the count for the pagination
          this.count = this.feats.filter((value) => {
            return value.known === true;
          }).length;
          break;
        case 'unknown':
          this.filter = {
            known: false
          };
          //Set the count for the pagination
          this.count = this.feats.filter((value) => {
            return value.known === false;
          }).length;
          break; 
        default:
          this.filter = undefined;
          //Set the count for the pagination
          this.count = this.feats.length;
          break;
      }    
    }
  }

  clearFilter() {
    this.filter = undefined;
  }

  updateCount() {
    if(this.filter && this.filter.known === true) {
      this.count = this.feats.filter((value) => {
        return value.known === false && value.name.indexOf(this.search) > -1;
      }).length;
    } else if(this.filter && this.filter.known === true) {
      this.count = this.feats.filter((value) => {
        return value.known === true && value.name.indexOf(this.search) > -1;
      }).length;
    } else {
      this.count = this.feats.filter((value) => {
        return value.name.toLowerCase().indexOf(this.search) >= 0;
      }).length;
    }
  }

  mapFeats() {
    if(this.character && this.character.feats ) {
      this.feats.forEach((feat:any, index:number) => {
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
      };
      this.character.feats.push(update);
    } else {
      for(var i in this.character.feats) {
        if(this.character.feats[i].name === feat.name) {
          this.character.feats.splice(i, 1);
        }
      }
    }
    this.mapFeats();
    this.updateCharacter('', 'feats', this.character.feats);
  }

  updateCharacter(path: string, property: string, value:any) {
    // localStorage.setItem('selectedCharacter', JSON.stringify(this.character));
    this.characterService.updateCharacter(path, property, value);
  }

  showFeatsModal(ev:any, feat:any) {
    let useFullScreen = (this.$mdMedia('xs'));

    this.$mdDialog.show({
      template: `<character-feats-modal feat-name="'${feat.name}'" feat-description="'${feat.description}'" />`,
      ariaLabel: 'Character Feats Modal',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: useFullScreen
    });
  }

}

export const characterFeatsComponent = {
  controller: CharacterFeatsController,
  templateUrl: 'app/character/feats/feats.component.html',
  // bindings: {
  //   character: '=',
  //   feats: '='
  // }
};
