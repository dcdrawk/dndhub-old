/// <reference path="../typings/index.d.ts" />

export default routesConfig;

/** @ngInject */
function routesConfig(
  $stateProvider: angular.ui.IStateProvider,
  $urlRouterProvider: angular.ui.IUrlRouterProvider,
  $locationProvider: angular.ILocationProvider
) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/');

  $stateProvider    
    .state('app', {
      url: '/',
      template: '<firebase></firebase>'
    })

    //Authentication
    .state('profile', {
      url: '/profile',
      template: '<profile></profile>'
    })
    .state('sign-in', {
      url: '/sign-in',
      template: '<sign-in></sign-in>'
    })
    .state('sign-up', {
      url: '/sign-up',
      template: '<signup></signup>'
    })

    //Character
    .state('character-list', {
      url: '/character-list',
      template: '<characterlist></characterlist>'
    })
    .state('character', {
      url: '/character',
      template: '<ui-view class="test"></ui-view>'
    })
    .state('character.general', {
      url: '/general',
      template: '<character-general/>'
    })
    .state('character.stats', {
      url: '/stats',
      template: '<character-stats/>'
    })
    .state('character.feats', {
      url: '/feats',
      template: '<character-feats/>'
    })
    .state('character.weapons', {
      url: '/weapons',
      template: '<character-weapons/>'
    })
    .state('character.armor', {
      url: '/armor',
      template: '<character-armor/>'
    })
    .state('character.spells', {
      url: '/spells',
      template: '<character-spells/>'
    })
}
