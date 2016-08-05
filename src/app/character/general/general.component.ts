import 'angular-material';
import * as angular from 'angular';
import CharacterService from '../character.service';
// import FirebaseService from '../../firebase/firebase.service';
import GameDataService from '../../firebase/game-data.service';
import GeneralService from './general.service';
// import ToastService from '../../../services/toast.service';

declare var firebase: any;

class CharacterGeneralController {

  static $inject: Array<string> = [
    // 'FirebaseService',
    'GameDataService',
    // 'ToastService',
    'CharacterService',
    '$scope',
    '$rootScope',
    'GeneralService'
    // // '$mdDialogOptions',
  ];

  character: any;
  races: any[];
  classes: any[];
  backgrounds: any[];
  alignments: any[];

  subraces: any[];
  gameData: any;

  constructor(
    // private firebaseService: FirebaseService,
    private gameDataService: GameDataService,
    // private toastService: ToastService,
    private characterService: CharacterService,
    private $scope: angular.IScope,
    private $rootScope: angular.IRootScopeService,
    private generalService: GeneralService
    ) {

      // this.gameData = this.gameDataService.gameData;

      this.generalService.getRaces().then((races: any[]) => {
        this.races = races;
        if(this.character) {
          this.getSubraces(this.character.race);
        }
      });

      this.generalService.getClasses().then((classes: any[]) => {
        this.classes = classes;
      });

      this.generalService.getBackgrounds().then((backgrounds: any[]) => {
        this.backgrounds = backgrounds;
      });

      this.generalService.getAlignments().then((alignments: any[]) => {
        this.alignments = alignments;
      });

      if(this.characterService.selectedCharacter) {
        this.character = this.characterService.selectedCharacter;
        // this.getSubraces(this.character.race);
      }

      this.$scope.$on('CHARACTER_SELECTED', () => {
        this.character = this.characterService.selectedCharacter;
        this.getSubraces(this.character.race);
      });
  }

  getSubraces(characterRace: string) {
    for(let i in this.races) {
      if(this.races[i].name === characterRace) {
        this.subraces = this.races[i].subraces;
        return;
      } else {
        this.subraces = undefined;
      }
    }
  }

  updateCharacter(path: string, property: string, value:any) {
    this.characterService.updateCharacter(path, property, value);
  }

  updateCharacterName(name: string) {
    this.$rootScope.$broadcast('CHARACTER_NAME_UPDATED', name);
  }

}

export const characterGeneralComponent = {
  controller: CharacterGeneralController,
  templateUrl: 'app/character/general/general.component.html'
};
