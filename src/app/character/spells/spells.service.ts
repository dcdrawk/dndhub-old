import * as angular from 'angular';
import CacheService from '../../services/cache.service';
declare var firebase: any;
declare var getData;
export default class SpellsService {

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
  getSpells() {
    return this.$q((resolve, reject) => {
      if(this.cacheService.get('spells')) {
        resolve(this.cacheService.get('spells'));
      } else {
        firebase.database().ref('/spells').once('value').then((snapshot) => {
          this.cacheService.put('spells', snapshot.val());
          resolve(snapshot.val());
        });
      }
    });
  }
}