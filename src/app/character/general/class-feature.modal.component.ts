import 'angular-material';
import * as angular from 'angular';
declare var firebase: any;

class ClassFeatureModalController {

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
  classFeature: any;
  feature: any;
  constructor(
    private $scope: angular.IScope,
    private $mdDialog: ng.material.IDialogService,
    private $sce: angular.ISCEService
    ) {

    // this.name = this.$sce.trustAsHtml(angular.extend(this.featName));    
    // this.description = this.$sce.trustAsHtml(angular.extend(this.featDescription));

    this.init();

    this.$scope.$on('$stateChangeStart', function(event:any, toState:any, toParams:any, fromState:any, fromParams:any) {
      event.preventDefault();
      $mdDialog.cancel();
    });
  }
  

  init() {
    this.feature = JSON.parse(this.classFeature.replace(/'/g, '"'));

    for(var i in this.feature) {
      if(typeof this.feature[i] === 'string') {
        this.feature[i] = angular.copy(this.feature[i].replace(/`/g, '\''));
      }
    }

    this.description = this.$sce.trustAsHtml(angular.extend(this.feature.description));

  }

  close() {
    this.$mdDialog.cancel();
  }
}

export const classFeatureModalComponent = {
  controller: ClassFeatureModalController,
  templateUrl: 'app/character/general/class-feature.modal.component.html',
  bindings: {
    classFeature: '='
  }
};
