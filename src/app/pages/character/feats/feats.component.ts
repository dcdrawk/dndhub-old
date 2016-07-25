import 'angular-material';
import * as angular from 'angular';

import CharacterService from '../character.service';

declare var firebase: any;

class CharacterFeatsController {

  static $inject: Array<string> = [
    'CharacterService',
    '$mdDialog'
  ];

  character: any;
  selected: any;
  feats: any;
  gameData: any;
  // abilityScores: any[];
  // skillOrder: any;
  // totalHP: number;

  constructor(
    private characterService: CharacterService,
    private $mdDialog: ng.material.IDialogService
    ) {
      this.selected = [];
      // this.abilityScores = abilityScores;
      // this.skillOrder = 'name';
      // this.totalHP = this.character.maxHP + this.character.tempHP;
  }  

  updateCharacter(path: string, property: string, value:any) {
    localStorage.setItem('selectedCharacter', JSON.stringify(this.character));
    this.characterService.updateCharacter(path, property, value);
  }

  showFeatsModal(ev:any, feat:any) {
    console.log(feat);
    this.$mdDialog.show({

      // template: '<character-feats-modal feat="' + this.gameData.feats + '"/>',
      // template: `<character-feats-modal feat-name="'${feat.name}'" feat-description="'${feat.description}'" />`,
      template: `<character-feats-modal feat-name="'${feat.name}'" feat-description="'${feat.description}'" />`,
      ariaLabel: 'Character Feats Modal',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {
        item: 'testItem'
      }
    })
    .then(() => {
      // this.getCharacters();
      // this.$rootScope.$broadcast('CHARACTER_LIST_UPDATED');
    });
  }

}

export const characterFeatsComponent = {
  controller: CharacterFeatsController,
  templateUrl: 'app/pages/character/feats/feats.component.html',
  bindings: {
    character: '=',
    gameData: '='
  }
};
