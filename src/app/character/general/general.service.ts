import * as angular from 'angular';
import CacheService from '../../services/cache.service';
declare var firebase: any;
declare var getData;
export default class GeneralService {

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

  //Get the classes
  getClasses() {
    return this.$q((resolve, reject) => {
      if(this.cacheService.get('classes')) {
        resolve(this.cacheService.get('classes'));
      } else {
        firebase.database().ref('/classes').once('value').then((snapshot) => {
          this.cacheService.put('classes', snapshot.val());
          resolve(snapshot.val());
        });
      }
    });
  }

  //Get the classes
  getClassFeatures() {
    return this.$q((resolve, reject) => {
      if(this.cacheService.get('classFeatures')) {
        resolve(this.cacheService.get('classFeatures'));
      } else {
        firebase.database().ref('/classFeatures').once('value').then((snapshot) => {
          this.cacheService.put('classFeatures', snapshot.val());
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

  //Get the backgrounds
  getBackgrounds() {
    return this.$q((resolve, reject) => {
      if(this.cacheService.get('backgrounds')) {
        resolve(this.cacheService.get('backgrounds'));
      } else {
        firebase.database().ref('/backgrounds').once('value').then((snapshot) => {
          this.cacheService.put('backgrounds', snapshot.val());
          resolve(snapshot.val());
        });
      }
    });
  }

  //Get the alignments
  getAlignments() {
    return this.$q((resolve, reject) => {
      if(this.cacheService.get('alignments')) {
        resolve(this.cacheService.get('alignments'));
      } else {
        firebase.database().ref('/alignments').once('value').then((snapshot) => {
          this.cacheService.put('alignments', snapshot.val());
          resolve(snapshot.val());
        });
      }
    });
  }
  
}
