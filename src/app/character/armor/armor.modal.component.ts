import 'angular-material';
import * as angular from 'angular';
declare var firebase: any;

class CharacterArmorModalController {

  static $inject: Array<string> = [
    '$scope',
    '$mdDialog',
    '$sce'
  ];

  armor: any;

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
    this.armor = JSON.parse(this.armor.replace(/'/g, '"'));
  }

  close() {
    this.$mdDialog.cancel();
  }
}

export const characterArmorModalComponent = {
  controller: CharacterArmorModalController,
  templateUrl: 'app/character/armor/armor.modal.component.html',
  bindings: {
    armor: '<'
  }
};
