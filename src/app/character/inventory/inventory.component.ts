import 'angular-material';
import * as angular from 'angular';

import CharacterService from '../character.service';
import InventoryService from './inventory.service';

class CharacterInventoryController {

  static $inject: Array<string> = [
    '$scope',
    'CharacterService',
    '$mdDialog',
    '$mdMedia',
    'InventoryService',
    '$timeout'
  ];

  character: any;
  selected: any;
  inventory: any[];
  gameData: any;
  limit: string;
  page: string;
  count: string;
  known: any;
  filter: any;
  search: string;
  filters: any;
  loaded: boolean;
  inventoryItems: any[];
  // abilityScores: any[];
  // skillOrder: any;
  // totalHP: number;

  constructor(
    private $scope: angular.IScope,
    private characterService: CharacterService,
    private $mdDialog: ng.material.IDialogService,
    private $mdMedia: ng.material.IMedia,
    private inventoryService: InventoryService,
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

    this.loaded = true;
    this.character = this.characterService.selectedCharacter;    
    this.updateCount();
    // this.inventoryService.getInventory().then((inventory: any[]) => {
    //   this.inventory = inventory;
    //   this.updateCount();
    // });
    
    this.$scope.$on('INVENTORY_UPDATED', (event, inventory) => {
      this.character.inventory = inventory;
      this.updateCount();
    });
  }

  updateCount() {
    if(this.character.inventory) {
      let array = this.character.inventory;

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
  }

  // selectItem(item: any) {
  //   if(!this.character.inventory) {
  //     this.character.inventory = [];
  //   }

  //   if(item.known) {
  //     let update = {
  //       name: item.name,
  //       known: item.known
  //     };
  //     this.character.inventory.push(update);
  //   } else {
  //     for(var i in this.character.inventory) {
  //       if(this.character.inventory[i].name === item.name) {
  //         this.character.inventory.splice(i, 1);
  //       }
  //     }
  //   }
  //   this.updateCharacter('', 'inventory', this.character.inventory);
  // }

  updateCharacter(path: string, property: string, value:any) {
    this.characterService.updateCharacter(path, property, value);
  }

  showInventoryModal(ev:any) {
    let useFullScreen = (this.$mdMedia('xs'));
    
    let inventory = this.character.inventory ? angular.copy(this.character.inventory) : undefined;    
    if(this.character.inventory) {
      inventory.forEach((item, index) => {
        item = this.stringifyObject(item);
      });
    } else {
      inventory = [];
    }

    if(this.inventory) {
      this.inventory.forEach((item, index) => {
        item = this.stringifyObject(item);
      })
    }

    inventory = JSON.stringify(inventory);

    
    // let items = JSON.stringify(this.inventory);

    // let items = JSON.stringify(['test', 'test2']);
    console.log(inventory);

    this.$mdDialog.show({
      template: `<character-inventory-modal class="modal-sm" inventory='${ inventory }'/>`,
      ariaLabel: 'Character Inventory Modal',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: useFullScreen
    });
  }

  stringifyObject(object) {
    for(var i in object) {
      if(typeof object[i] === 'string') {
        object[i] = object[i].replace(/'/g, '`');
      }
    }
    return object;
  }

  

}


export const characterInventoryComponent = {
  controller: CharacterInventoryController,
  templateUrl: 'app/character/inventory/inventory.component.html'
};
