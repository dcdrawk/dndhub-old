import 'angular-material';
import CharacterService from '../character/character.service';

interface IMenuModel {
    toggleSidenav(menuId: string): void;
}

declare var firebase: any;

const menu = [{
  title: 'General',
  sref: 'character.general',
  icon: 'info'
},{
  title: 'Stats',
  sref: 'character.stats',
  svg: 'dice-d20'
},{
  title: 'Feats',
  sref: 'character.general',
  icon: 'stars'
},{
  title: 'Weapons',
  sref: 'character.general',
  svg: 'sword'
},{
  title: 'Spells',
  sref: 'character.general',
  icon: 'whatshot'
},{
  title: 'Inventory',
  sref: 'character.general',
  icon: 'drafts'
},{
  title: 'Adventure Group',
  sref: 'character-info',
  icon: 'group'
},{
  title: 'Quest Log',
  sref: 'character-info',
  icon: 'help'
}];

class SidenavController implements IMenuModel {
  
  static $inject: Array<string> = ['$mdSidenav', '$scope', 'CharacterService', '$state'];
  menu: any[];
  userSignedIn: any;
  userSignedOut : any;
  characters: any;
  signedIn: boolean;
  characterListUpdated: any;
  selectedCharacterIndex: number;
  characterNameUpdated: any;
  characterListLoaded: any;

  constructor(
    private $mdSidenav: ng.material.ISidenavService,
    private $scope: ng.IScope,
    private characterService: CharacterService,
    private $state: ng.ui.IStateService
  ) {
    this.menu = menu;
    this.signedIn = false;
    this.getSelectedId();

    //Listen if the user signs in
    this.userSignedIn = this.$scope.$on('USER_SIGNED_IN', (event, user) => {
      this.signedIn = true;
      this.selectedCharacterIndex = this.getSelectedId();
    });

    //Listen if the user signs in
    this.userSignedOut = this.$scope.$on('USER_SIGNED_OUT', (event, user) => {
      this.signedIn = false;
      this.characters = undefined;
    });
    
    //Get notified if the character list is updated
    this.characterListLoaded = this.$scope.$on('CHARACTER_LIST_LOADED', (event, characters) => {
      this.characters = characters;
      
    });

    //Get notified if the character list is updated
    this.characterListUpdated = this.$scope.$on('CHARACTER_LIST_UPDATED', (event) => {
      this.characters = undefined;
    });

    //Get notified if a character name is updated so we can keep the list up to date
    this.characterNameUpdated = this.$scope.$on('CHARACTER_NAME_UPDATED', (event, name) => {
      this.characters[this.selectedCharacterIndex].name = name;
    });
  }

  //Get the list of characters
  getCharacters() {
    if(firebase.auth().currentUser) {    
      this.characterService.getCharacters().then((characters:any[]) => {
        // console.log(characters);
        this.characters = characters;      
      });
    }
  }

  getSelectedId() {
    if(!localStorage.getItem('selectedCharacterIndex')) {
      return undefined;
    } else {
      return +localStorage.getItem('selectedCharacterIndex');
    }
  }
  
  //Get the list of characters
  selectCharacter(index: number) {
    localStorage.setItem('selectedCharacterIndex', index.toString());
    this.characterService.selectCharacter(this.characters[index]);

    console.log(this.characterService.selectedCharacter);
  }

  toggleSidenav(menuId: string) {
    this.$mdSidenav(menuId).toggle();
        console.log(menuId);
  }
}

export const sidenav = {
  controller: SidenavController,
  templateUrl: 'app/layout/sidenav.html'
};
