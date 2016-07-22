import * as angular from 'angular';
import FirebaseService from '../firebase/firebase.service';

declare var firebase: any;
declare var config: any;

export default class CharacterService {

  static $inject: Array<string> = ['$q', '$rootScope', 'FirebaseService'];
  db: any;
  currentUser: any;
  characters: any;

  constructor(
    private $q: angular.IQService,
    private $rootScope: angular.IRootScopeService,
    private firebaseService: FirebaseService
  ) {
    
  }

  //Get the list of characters
  getCharacters() {
    var userId = firebase.auth().currentUser.uid;
    var url = 'characters/' + userId;
    return this.$q((resolve, reject) => {
      this.firebaseService.getData(url).then((characters) => {
        //Map the character object to an array, including the id/key of the character
        //Knowing the id/key will allow us to update/delete it in the future
        let characterlist:any[] = Object.keys(characters).map(function (key:string) {
          let id = 'id';
          characters[key][id] = key;
          return characters[key];
        });
        //Set characters in local storage
        localStorage.setItem('characters', JSON.stringify(characterlist));
        resolve(characterlist);
      });
    });
  }

  //Save a new character
  saveNewCharacter(character:any) {
    var userId = firebase.auth().currentUser.uid;
    return this.$q((resolve, reject) => {
      firebase.database().ref('characters/' + userId + '/').push(character).then(() => {
        resolve();
      });
    });
  }

  //Delete a character
  deleteCharacter(character:any) {
    var userId = firebase.auth().currentUser.uid;
    return this.$q((resolve, reject) => {
      firebase.database().ref('characters/' + userId + '/' + character.id).remove().then(() => {
        resolve();
      });
    });
  }

}
