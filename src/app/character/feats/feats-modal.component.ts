import 'angular-material';
import * as angular from 'angular';
declare var firebase: any;

class CharacterFeatsModalController {

  static $inject: Array<string> = [
    '$scope',
    '$mdDialog',
    '$sce'
  ];

  feat: any;

  featName: any;
  featDescription: any;
  name: any;
  description: any;

  constructor(
    private $scope: angular.IScope,
    private $mdDialog: ng.material.IDialogService,
    private $sce: angular.ISCEService
    ) {

    this.name = this.$sce.trustAsHtml(angular.extend(this.featName));    
    this.description = this.$sce.trustAsHtml(angular.extend(this.featDescription));

    this.init();

    this.$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      event.preventDefault();
      $mdDialog.cancel();
    });
  }
  

  init() {

  }

  close() {
    this.$mdDialog.cancel();
  }
}

export const characterFeatsModalComponent = {
  controller: CharacterFeatsModalController,
  templateUrl: 'app/character/feats/feats-modal.component.html',
  bindings: {
    featName: '=',
    featDescription: '='
  }
};
