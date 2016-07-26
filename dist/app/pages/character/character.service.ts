import * as angular from 'angular';
import FirebaseService from '../firebase/firebase.service';

declare var firebase: any;
declare var config: any;
declare var resolve: any;
declare var reject: any;

export default class CharacterService {

  static $inject: Array<string> = [
   '$q',
   '$rootScope',
   'FirebaseService'
  ];
  db: any;
  currentUser: any;
  characters: any;
  selectedCharacter: any;
  userSignedIn: any;

  constructor(
    private $q: angular.IQService,
    private $rootScope: angular.IRootScopeService,
    private firebaseService: FirebaseService
  ) {
    console.log(
      'character service'
    );
    this.userSignedIn = this.$rootScope.$on('USER_SIGNED_IN', () => {
      this.getCharacters().then((characterlist) => {
        this.characters = characterlist;
        this.$rootScope.$broadcast('CHARACTER_LIST_LOADED', characterlist);
        if(localStorage.getItem('selectedCharacterIndex')) {
          this.selectedCharacter = this.characters[+localStorage.getItem('selectedCharacterIndex')];
          this.$rootScope.$broadcast('CHARACTER_SELECTED', characterlist);
        }
      });
    });

    // console.log('SERVICE THIS');
//     if(firebase.auth().currentUser) {
      
    // }
  }

  //Get the list of characters
  getCharacters() {
    console.log('CHARACTER SERVICE GET CHARACTERS');
    // if(firebase.auth().currentUser) {
      var userId = firebase.auth().currentUser.uid;
      var url = 'characters/' + userId;
      var characterlist = [];
      return this.$q((resolve, reject) => {
        this.firebaseService.getData(url).then((characters:any) => {
          // console.log(characters);
          //Map the character object to an array, including the id/key of the character
          //Knowing the id/key will allow us to update/delete it in the future

          if(characters) {
            characterlist = Object.keys(characters).map(function (key:string) {
              let id = 'id';
              characters[key][id] = key;
              return characters[key];
            });
          }
          this.characters = characterlist;
          this.$rootScope.$broadcast('CHARACTER_LIST_LOADED', characterlist);
          resolve(characterlist);
        });
      });
    // }
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
      // localStorage.setItem('characters', JSON.stringify(this.getCharacters()));
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
    // localStorage.setItem('selectedCharacter', JSON.stringify(character));
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
