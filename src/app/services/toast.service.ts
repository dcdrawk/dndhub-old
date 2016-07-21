// import * as angular from 'angular';
import 'angular-material';

declare var firebase: any;
declare var config: any;

export default class ToastService {
  static $inject: Array<string> = ['$mdToast'];

  constructor(
    private $mdToast: ng.material.IToastService 
  ) {
  }

  //Show a simple toast in the bottom right
  showToast(message: string) {
    var toast = this.$mdToast.simple()
      .textContent(message)
      .position('bottom right');
    this.$mdToast.show(toast);
  }
}
