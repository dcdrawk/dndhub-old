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

    // this.name = this.$sce.trustAsHtml(angular.extend(this.featName));    
    // this.description = this.$sce.trustAsHtml(angular.extend(this.featDescription));

    this.init();

    this.$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      event.preventDefault();
      $mdDialog.cancel();
    });

    this.armor = JSON.parse(this.armor.replace(/'/g, '"'));
  }
  

  init() {

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
