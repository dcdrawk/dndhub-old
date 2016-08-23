import 'angular-material';
import * as angular from 'angular';
declare var firebase: any;
import CharacterService from '../character.service';
import InventoryService from './inventory.service';

const currencyList = [
  {
    name: 'Gold',
    value: 'gp'
  },{
    name: 'Silver',
    value: 'sp'
  },{
    name: 'Copper',
    value: 'cp'
  },{
    name: 'Elerium',
    value: 'ep'
  }
]

class CharacterInventoryModalController {

  static $inject: Array<string> = [
    '$scope',
    '$rootScope',
    '$mdDialog',
    '$sce',
    'CharacterService',
    'InventoryService'
  ];

  item: any;
  desc: any;
  higherLevel: any;
  inventory: any[];
  currencyList: any[];
  inventoryItems: any[];
  items: any[];
  constructor(
    private $scope: angular.IScope,
    private $rootScope: angular.IRootScopeService,
    private $mdDialog: ng.material.IDialogService,
    private $sce: angular.ISCEService,
    private characterService: CharacterService,
    private inventoryService: InventoryService
    ) {

    this.$scope.$on('$stateChangeStart', function(event:any, toState:any, toParams:any, fromState:any, fromParams:any) {
      event.preventDefault();
      $mdDialog.cancel();
    });
    // console.log(this.items);
    this.init(); 
  }
  

  init() {
    // this.item = {};
    // this.item.name = '';
    this.currencyList = currencyList;
    this.inventoryService.getInventory().then((inventoryItems: any[]) => {
      this.inventoryItems = inventoryItems;
    });
  }

  addItem(item) {
    console.log(item);
    //'', 'name', $ctrl.character.name
    let newItem = angular.copy(item);

    newItem.cost = newItem.cost;
    delete newItem.currency;    
    this.inventory.push(newItem);
    this.updateCharacter('', 'inventory', this.inventory);
    this.$rootScope.$broadcast('INVENTORY_UPDATED', this.inventory);
  }

  resetItem(){
    this.item.name = '';
    this.item.cost = 0;
    // this.item.
  }

  updateCharacter(path: string, property: string, value:any) {
    this.characterService.updateCharacter(path, property, value);
  }

  close() {
    this.$mdDialog.hide();
  }

  querySearch (query:string) {

    //Set the count for the pagination
    let results = this.inventoryItems.filter((value) => {
      return value.indexOf(query) >= 0;
    });
    // let results = query ? this.inventory.filter(item => item.indexOf(query)) : this.items;

    // let results = query ? this.inventoryItems.filter( this.testFilter ) : this.items;
    // let results = this.inventoryItems.filter(this.testFilter(query));

    // }) : this.items;
    // var deferred = $q.defer();
    // $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
    console.log(results);
    return results;
  }

  testFilter () {
    return 
    // let lowercaseQuery = angular.lowercase(query);
    // return function filterFn(item) {
    //   return (item.value.indexOf(lowercaseQuery) === 0);
    // };
  }

}

export const characterInventoryModalComponent = {
  controller: CharacterInventoryModalController,
  templateUrl: 'app/character/inventory/inventory.modal.component.html',
  bindings: {
    inventory: '<'
  }
};


