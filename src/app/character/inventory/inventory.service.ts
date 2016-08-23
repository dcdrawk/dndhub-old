import * as angular from 'angular';
import CacheService from '../../services/cache.service';

declare var firebase: any;
declare var getData;
export default class InventoryService {

  static $inject: Array<string> = [
    '$q',
    '$rootScope',
    'CacheService'
  ];

  constructor(
    private $q: angular.IQService,
    private $rootScope: angular.IRootScopeService,
    private cacheService: CacheService
  ) {
    
  }

  //Get the game data for DND
  getInventory() {
    return this.$q((resolve, reject) => {
      if(this.cacheService.get('inventory')) {
        resolve(this.cacheService.get('inventory'));
      } else {
        firebase.database().ref('/inventory').once('value').then((snapshot) => {
          this.cacheService.put('inventory', snapshot.val());
          resolve(snapshot.val());
        });
      }
    });
  }
}
