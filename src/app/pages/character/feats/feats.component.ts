import 'angular-material';
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
  search: string;

  constructor(
    private characterService: CharacterService,
    private $mdDialog: ng.material.IDialogService
    ) {
      this.selected = [];
      this.limit = '5';
      this.page = '1';
      this.count = this.gameData.feats.length;
      this.init();
  }  

  init() {
    this.known = {
      known: true
    };    
    this.mapFeats();
  }

  changeFilter(filter: any) {
    switch (filter) {
      case 'known':
        this.filter = {
          known: true
        };
        //Set the count for the pagination
        this.count = this.gameData.feats.filter((value) => {
          return value.known === true;
        }).length;
        break;
      case 'unknown':
        this.filter = {
          known: false
        };
        //Set the count for the pagination
        this.count = this.gameData.feats.filter((value) => {
          return value.known === false;
        }).length;
        break; 
      default:
        this.filter = undefined;
        //Set the count for the pagination
        this.count = this.gameData.feats.length;
        break;
    }    
  }

  updateCount() {
    if(this.filter && this.filter.known === true) {
      this.count = this.gameData.feats.filter((value) => {
        return value.known === false && value.name.indexOf(this.search) > -1;
      }).length;
    } else if(this.filter && this.filter.known === true) {
      this.count = this.gameData.feats.filter((value) => {
        return value.known === true && value.name.indexOf(this.search) > -1;
      }).length;
    } else {
      this.count = this.gameData.feats.filter((value) => {
        console.log(value.name.indexOf(this.search));
        return value.name.toLowerCase().indexOf(this.search) >= 0;
      }).length;
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
    console.log(feat);
    this.$mdDialog.show({
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
