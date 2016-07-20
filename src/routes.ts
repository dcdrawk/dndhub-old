/// <reference path="../typings/index.d.ts" />

export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider, $locationProvider: angular.ILocationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('app', {
      url: '/',
      template: '<app></app>'
    })
    // .state('buttons', {
    //   url: '/buttons',
    //   template: '<buttons></buttons>'
    // })
    // .state('typography', {
    //   url: '/typography',
    //   template: '<typography></typography>'
    // })

    //Authentication
    .state('profile', {
      url: '/profile',
      template: '<profile></profile>'
    })
    .state('sign-in', {
      url: '/sign-in',
      template: '<firebase></firebase>'
    })
    .state('sign-up', {
      url: '/sign-up',
      template: '<signup></signup>'
    })

    //Character
    .state('character-list', {
      url: '/character-list',
      template: '<characterlist></characterlist>'
    });
}
