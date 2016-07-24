import * as angular from 'angular';
import FirebaseService from '../firebase/firebase.service';

declare var firebase: any;
declare var config: any;
declare var resolve: any;
declare var reject: any;

export default class CharacterService {

  static $inject: Array<string> = ['$q', '$rootScope', 'FirebaseService'];
  db: any;
  currentUser: any;
  characters: any;
  selectedCharacter: any;

  constructor(
    private $q: angular.IQService,
    private $rootScope: angular.IRootScopeService,
    private firebaseService: FirebaseService
  ) {
    if(localStorage.getItem('selectedCharacter')) {
      console.log('character in localstorage');
      this.selectedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));
      this.$rootScope.$broadcast('CHARACTER_SELECTED');      
    }

    if(!localStorage.getItem('characters')) {
      this.getCharacters().then((characterlist) => {
        this.characters = characterlist;
      });
    } else {
      //Get characters from local storage
      this.characters = JSON.parse(localStorage.getItem('characters'));
    }
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
    firebase.database().ref('characters/' + userId + '/').push(character);
  }

  //Save a character, requires a path to the property and value being assigned
  //e.g. path = 'skills/dexterity' value: {bon} 
  updateCharacter(path: string, property: string, value:any) {
    console.log(this.selectedCharacter);
    var userId = firebase.auth().currentUser.uid;
    let update = {};
    update[property] = value;
    firebase.database().ref('characters/' + userId + '/' + this.selectedCharacter.id + '/' + path).update(update).then(() => {
      console.log('update successful');
      localStorage.setItem('characters', JSON.stringify(this.getCharacters()));
    });

    //Update the master character list in local storage
    // let characterIndex = this.getSelectedId();    
    // // console.log(this.characters);
    // // this.characters[characterIndex] = JSON.parse(localStorage.getItem('selectedCharacter'));
    // // console.log(JSON.parse(localStorage.getItem('selectedCharacter')));
    // // localStorage.setItem('selectCharacter', JSON.stringify(this.selectedCharacter));
    // localStorage.setItem('characters', JSON.stringify(this.characters));
  }
  

  //Select a character
  selectCharacter(character:any) {
    this.selectedCharacter = character;
    localStorage.setItem('selectedCharacter', JSON.stringify(character));
    this.$rootScope.$broadcast('CHARACTER_SELECTED');
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

  getSelectedId() {
    if(!localStorage.getItem('selectedCharacterIndex')) {
      return undefined;
    } else {
      return +localStorage.getItem('selectedCharacterIndex');
    }
  }

}
