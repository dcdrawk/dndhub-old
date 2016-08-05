import * as angular from 'angular';
declare var firebase: any;

const endpoints = [
  'alignments',
  'armor',
  'backgrounds',
  'classes',
  'skills',
  'classFeatures',
  'feats',
  'languages',
  'races',
  'weapons',
  'spells'
];


export default class GameDataService {

  static $inject: Array<string> = ['$q', '$rootScope'];
  db: any;
  gameData: any;

  constructor(
    private $q: angular.IQService,
    private $rootScope: angular.IRootScopeService
  ) {    
    this.gameData = JSON.parse(localStorage.getItem('gameData'));
    if(!this.gameData) {
      this.gameData = {};
      this.getGameData().then(() => {
        localStorage.setItem('gameData', JSON.stringify(this.gameData));
        $rootScope.$broadcast('GAME_DATA_LOADED');
      });
    } else {
      $rootScope.$broadcast('GAME_DATA_LOADED');      
    }    
  }

  //Get the game data for DND
  getGameData() {
    console.log('getting game data...');
    //Get all of the necessary game data...
    var promises = endpoints.map((endpoint) => {
      return this.$q((resolve, reject) => {
        firebase.database().ref('/' + endpoint).once('value').then((snapshot) => {
          this.gameData[endpoint] = snapshot.val();
          resolve();
        });
      });
    });    
    
    return this.$q.all(promises);
  }
}
