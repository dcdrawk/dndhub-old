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

    this.init();

    this.$scope.$on('$stateChangeStart', function(event:any, toState:any, toParams:any, fromState:any, fromParams:any) {
      event.preventDefault();
      $mdDialog.cancel();
    });
    
  }  

  init() {
    this.weapon = JSON.parse(this.weapon.replace(/'/g, '"'));
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
