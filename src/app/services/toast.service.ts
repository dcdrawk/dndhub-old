import * as angular from 'angular';
import 'angular-material';

declare var firebase: any;
declare var config: any;

export default class ToastService {
  static $inject: Array<string> = ['$mdToast'];

  constructor(
    private $mdToast: ng.material.IToastService 
  ) {
  }

  showToast(message: string) {
    var toast = this.$mdToast.simple()
      .textContent(message)
      .position('bottom right')
    this.$mdToast.show(toast).then(function(response) {
      if ( response == 'ok' ) {
        alert('You clicked the \'UNDO\' action.');
      }
    });
  }

}