import 'angular-material';

interface IMenuModel {
    toggleSidenav(menuId: string): void;
}

// const menu = [{
//     title: 'Components',
//     children: [{
//       title: 'Buttons',
//       sref: 'buttons'
//     }, {
//       title: 'Forms',
//       sref: 'buttons'
//     }, {
//       title: 'Cards',
//       sref: 'buttons'
//     }, {
//       title: 'Datepicker',
//       sref: 'buttons'
//     }]
//     }, {
//     title: 'Styles',
//     children: [{
//       title: 'Typography',
//       sref: 'typography'
//     }]
//   }];

const menu = [{
  title: 'Characters',
  sref: 'characters',
  icon: 'people'
},{
  title: 'Character Info',
  sref: 'characters',
  icon: 'info'
},{
  title: 'Adventure Log',
  sref: 'characters',
  icon: 'description'
},

];

class SidenavController implements IMenuModel {
  
  static $inject: Array<string> = ['$mdSidenav'];
  menu: any[];

  constructor(private $mdSidenav: ng.material.ISidenavService) {
    this.menu = menu;
  }

  toggleMenu(menuId: string) {
    var test = $(menuId).find('ul');
    console.log(test);
    $(test).slideToggle( 'fast' );
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
