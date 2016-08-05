import * as angular from 'angular';
import CacheService from '../../services/cache.service';
declare var firebase: any;
declare var getData;
export default class StatsService {

  static $inject: Array<string> = [
    '$q',
    '$rootScope',
    'CacheService'
  ];

  // db: any;
  // gameData: any;

  constructor(
    private $q: angular.IQService,
    private $rootScope: angular.IRootScopeService,
    private cacheService: CacheService
  ) {

  }

  //Get the game data for DND
  getSkills() {
    console.log('get the data');
    return this.$q((resolve, reject) => {
      if(this.cacheService.get('skills')) {
        console.log('skills in cacheService');
        resolve(this.cacheService.get('skills'));
      } else {
        console.log('skills not in cache, fetching...');
        firebase.database().ref('/skills').once('value').then((snapshot) => {
          console.log('skills loaded!');
          this.cacheService.put('skills', snapshot.val());
          // console.log(snapshot.val());
          // this.gameData[endpoint] = snapshot.val();
          resolve(snapshot.val());
        });
      }
    });
  }

  //Get the races
  getRaces() {
    return this.$q((resolve, reject) => {
      if(this.cacheService.get('races')) {
        resolve(this.cacheService.get('races'));
      } else {
        firebase.database().ref('/races').once('value').then((snapshot) => {
          this.cacheService.put('races', snapshot.val());
          resolve(snapshot.val());
        });
      }
    });
  }
}
