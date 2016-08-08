import * as angular from 'angular';
import CacheService from '../../services/cache.service';
declare var firebase: any;
declare var getData;
export default class FeatsService {

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
  getFeats() {
    return this.$q((resolve, reject) => {
      if(this.cacheService.get('feats')) {
        resolve(this.cacheService.get('feats'));
      } else {
        firebase.database().ref('/feats').once('value').then((snapshot) => {
          this.cacheService.put('feats', snapshot.val());
          resolve(snapshot.val());
        });
      }
    });
  }
}
