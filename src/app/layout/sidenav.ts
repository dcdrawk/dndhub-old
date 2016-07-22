import 'angular-material';
import CharacterService from '../pages/character/character.service';

interface IMenuModel {
    toggleSidenav(menuId: string): void;
}

const menu = [{
  title: 'Character Info',
  sref: 'character-info',
  icon: 'person'
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
  characters: any;
  signedIn: boolean;
  characterListUpdated: any;
  selectedCharacterIndex: number;

  constructor(
    private $mdSidenav: ng.material.ISidenavService,
    private $scope: ng.IScope,
    private characterService: CharacterService,
    private $state: ng.ui.IStateService
  ) {
    this.menu = menu;
    this.signedIn = false;

    //Listen if the user signs in
    this.userSignedIn = this.$scope.$on('USER_SIGNED_IN', (event, user) => {
      //Check if characters are in local storage
      this.signedIn = true;
      console.log('signed in...');
      if(!localStorage.getItem('characters')) {
        this.getCharacters();
        this.selectedCharacterIndex = this.getSelectedId();
      } else {
        //Get characters from local storage
        this.characters = JSON.parse(localStorage.getItem('characters'));
        this.selectedCharacterIndex = this.getSelectedId();
      }

      console.log(this.selectedCharacterIndex);
      this.$scope.$apply();
    });

    //Get notified if the character list is updated
    this.characterListUpdated = this.$scope.$on('CHARACTER_LIST_UPDATED', (event) => {
      this.getCharacters();
    });
  }

  //Get the list of characters
  getCharacters() {
    this.characterService.getCharacters().then((characters:any[]) => {
      this.characters = characters;      
    });
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
    console.log(this.characters[index]);
    localStorage.setItem('selectedCharacterIndex', index.toString());
    this.characterService.selectCharacter(this.characters[index]);
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
