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

    this.init();

    this.$scope.$on('$stateChangeStart', function(event:any, toState:any, toParams:any, fromState:any, fromParams:any) {
      event.preventDefault();
      $mdDialog.cancel();
    });
  }
  

  init() {
    this.name = this.$sce.trustAsHtml(angular.extend(this.featName));    
    this.description = this.$sce.trustAsHtml(angular.extend(this.featDescription));
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
