import 'angular-material';
import CharacterService from '../pages/character/character.service';

interface IMenuModel {
    toggleSidenav(menuId: string): void;
}

const menu = [{
  title: 'Character Info',
  sref: 'characters',
  icon: 'person'
},{
  title: 'Adventure Group',
  sref: 'characters',
  icon: 'group'
},{
  title: 'Quest Log',
  sref: 'characters',
  icon: 'help'
}
];

class SidenavController implements IMenuModel {
  
  static $inject: Array<string> = ['$mdSidenav', '$scope', 'CharacterService'];
  menu: any[];
  userSignedIn: any;
  characters: any;
  signedIn: boolean;
  characterListUpdated: any;
  
  constructor(
    private $mdSidenav: ng.material.ISidenavService,
    private $scope: ng.IScope,
    private characterService: CharacterService
  ) {
    this.menu = menu;
    //Listen if the user signs in
    this.userSignedIn = this.$scope.$on('USER_SIGNED_IN', (event, user) => {
      //Check if characters are in local storage
      if(!localStorage.getItem('characters')) {
        this.getCharacters();
      } else {
        //Get characters from local storage
        this.characters = JSON.parse(localStorage.getItem('characters'));
      }
      this.signedIn = true;
      this.$scope.$apply();
    });

    this.characterListUpdated = this.$scope.$on('CHARACTER_LIST_UPDATED', (event) => {
      this.getCharacters();
      //Check if characters are in local storage
      // if(!localStorage.getItem('characters')) {
      //   this.getCharacters();
      // } else {
      //   //Get characters from local storage
      //   this.characters = JSON.parse(localStorage.getItem('characters'));
      // }
      // this.signedIn = true;
      // this.$scope.$apply();
    });
  }

  //Get the list of characters
  getCharacters() {
    this.characterService.getCharacters().then((characters:any[]) => {
      this.characters = characters;
    });
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
