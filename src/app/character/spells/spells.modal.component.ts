import 'angular-material';
import * as angular from 'angular';
declare var firebase: any;

class CharacterSpellsModalController {

  static $inject: Array<string> = [
    '$scope',
    '$mdDialog',
    '$sce'
  ];

  spell: any;
  desc: any;
  higherLevel: any;

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
    console.log(this.spell);
    this.spell = JSON.parse(this.spell.replace(/'/g, '"'));

    for(var i in this.spell) {
      if(typeof this.spell[i] === 'string') {
        this.spell[i] = this.spell[i].replace(/`/g, "'");
      }
    }

    this.desc = this.$sce.trustAsHtml(this.spell.desc);
    if(this.spell.higher_level) {
      this.higherLevel = this.$sce.trustAsHtml(this.spell.higher_level);
    }
  }
  

  init() {

  }

  close() {
    this.$mdDialog.cancel();
  }
}

export const characterSpellsModalComponent = {
  controller: CharacterSpellsModalController,
  templateUrl: 'app/character/spells/spells.modal.component.html',
  bindings: {
    spell: '<'
  }
};


