import * as angular from 'angular';
import CacheService from '../../services/cache.service';
declare var firebase: any;
declare var getData;
export default class WeaponsService {

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
  getWeapons() {
    return this.$q((resolve, reject) => {
      if(this.cacheService.get('weapons')) {
        resolve(this.cacheService.get('weapons'));
      } else {
        firebase.database().ref('/weapons').once('value').then((snapshot) => {
          this.cacheService.put('weapons', snapshot.val());
          resolve(snapshot.val());
        });
      }
    });
  }
}
