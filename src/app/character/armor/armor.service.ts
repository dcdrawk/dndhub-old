import * as angular from 'angular';
import CacheService from '../../services/cache.service';
declare var firebase: any;
declare var getData;
export default class ArmorService {

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
  getArmor() {
    return this.$q((resolve, reject) => {
      if(this.cacheService.get('armor')) {
        resolve(this.cacheService.get('armor'));
      } else {
        firebase.database().ref('/armor').once('value').then((snapshot) => {
          this.cacheService.put('armor', snapshot.val());
          resolve(snapshot.val());
        });
      }
    });
  }
}