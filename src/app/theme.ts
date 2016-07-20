import 'angular-material';

// class themeConfig {

//   static $inject: Array<string> = ['$mdThemingProvider'];

//   constructor(private mdThemingProvider: ng.material.ITheme) {
//     console.log('theme config');
//   }
// }

// export default themeConfig;

/// <reference path="../typings/index.d.ts" />

export default themeConfig;

/** @ngInject */
function themeConfig($mdThemingProvider: ng.material.IThemingProvider) {
  // $locationProvider.html5Mode(true).hashPrefix('!');
  // $urlRouterProvider.otherwise('/');

  $mdThemingProvider.theme('default')
    .primaryPalette('indigo')
    .accentPalette('blue', {
      'default': '500' // use shade 200 for default, and keep all other shades the same
    });
}
