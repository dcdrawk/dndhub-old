import 'angular-material';
import * as angular from 'angular';
declare var firebase: any;

class CharacterWeaponsModalController {

  static $inject: Array<string> = [
    '$scope',
    '$mdDialog',
    '$sce'
  ];

  weapon: any;

  constructor(
    private $scope: angular.IScope,
    private $mdDialog: ng.material.IDialogService,
    private $sce: angular.ISCEService
    ) {

    // this.name = this.$sce.trustAsHtml(angular.extend(this.featName));    
    // this.description = this.$sce.trustAsHtml(angular.extend(this.featDescription));

    this.init();

    this.$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      event.preventDefault();
      $mdDialog.cancel();
    });

    this.weapon = JSON.parse(this.weapon.replace(/'/g, '"'));
  }
  

  init() {

  }

  close() {
    this.$mdDialog.cancel();
  }
}

export const characterWeaponsModalComponent = {
  controller: CharacterWeaponsModalController,
  templateUrl: 'app/character/weapons/weapons.modal.component.html',
  bindings: {
    weapon: '<'
  }
};
