import 'angular-material';
/// <reference path="../typings/index.d.ts" />

export default themeConfig;

/** @ngInject */
function themeConfig($mdThemingProvider: ng.material.IThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('indigo', {
      'default': '600'
    })
    .accentPalette('orange', {
      'default': '500' // use shade 500 for default, and keep all other shades the same
    });
}
