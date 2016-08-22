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
    'GeneralService',
    '$timeout',
    '$mdDialog',
    '$mdMedia'
    // // '$mdDialogOptions',
  ];

  character: any;
  races: any[];
  classes: any[];
  backgrounds: any[];
  alignments: any[];

  subraces: any[];
  classFeatures: any[];

  gameData: any;
  loaded: boolean;
  class: any;
  limit: string;
  page: string;
  count: string;
  order: string;

  constructor(
    // private firebaseService: FirebaseService,
    private gameDataService: GameDataService,
    // private toastService: ToastService,
    private characterService: CharacterService,
    private $scope: angular.IScope,
    private $rootScope: angular.IRootScopeService,
    private generalService: GeneralService,
    private $timeout: angular.ITimeoutService,
    private $mdDialog: ng.material.IDialogService,
    private $mdMedia: ng.material.IMedia
    ) {

      // this.gameData = this.gameDataService.gameData;
      this.limit = '5';
      this.page = '1';
      this.order = 'level';
      this.classFeatures = [];
        
      this.generalService.getRaces().then((races: any[]) => {
        this.races = races;
        if(this.character) {
          this.getSubraces(this.character.race);
        }
      });

      this.generalService.getClasses().then((classes: any[]) => {
        this.classes = classes;
        if(this.character) {
          this.getClass(this.character.class);
        }
      });

      this.generalService.getBackgrounds().then((backgrounds: any[]) => {
        this.backgrounds = backgrounds;
      });

      this.generalService.getAlignments().then((alignments: any[]) => {
        this.alignments = alignments;
      });
      
      this.generalService.getClassFeatures().then((classFeatures: any[]) => {
        this.classFeatures = classFeatures;
        this.getClassFeatures();
      });



      if(this.characterService.selectedCharacter) {
        this.character = this.characterService.selectedCharacter;
        
        this.getSubraces(this.character.race);
      }

      this.$scope.$on('CHARACTER_SELECTED', () => {
        this.character = this.characterService.selectedCharacter;        
        
        this.getSubraces(this.character.race);
        this.getClass(this.character.class);
        this.getClassFeatures();
      });

      this.$timeout(() => {
        this.loaded = true;
      }, 300);
  }

  getClass(className: string) {
    this.classes.forEach((classObj) => {
      if(className === classObj.name) {
        this.class = classObj;
        return;
      }
    });
  }

  getClassFeatures() {    
    if(this.character && this.classFeatures) {
      this.character.classFeatures = [];
      this.classFeatures.forEach((classFeature) => {
        if(this.character.class === classFeature.class) {
          if(classFeature.archetype === 'None' || classFeature.archetype === this.character.archetype) {
            classFeature.abilities.forEach((ability) => {
              ability.level = parseInt(ability.level, 0);
            });
            this.character.classFeatures = this.character.classFeatures.concat(classFeature.abilities);
          }
        }
      });
      this.count = this.character.classFeatures.length.toString();
    }
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

  showClassFeatureModal(ev:any, classFeature:any) {
    let useFullScreen = (this.$mdMedia('xs'));
    // let spellName = spell.name;

    classFeature = angular.copy(classFeature);
    console.log(classFeature);
    for(var i in classFeature) {
      if(typeof classFeature[i] === 'string') {
        classFeature[i] = classFeature[i].replace(/'/g, '`');
      } else {
        
      }
      if(classFeature.hasOwnProperty('options')) {
        classFeature.options.forEach((item, index) => {
          for(var j in item) {
            if(typeof item[j] === 'string') {
              item[j] = item[j].replace(/'/g, '`');
            }
          }
        });
      }
    }

    classFeature = JSON.stringify(classFeature).replace(/"/g, '\\\'');
    this.$mdDialog.show({
      template: `<class-feature-modal class-feature="'${classFeature}'" />`,
      ariaLabel: 'Class Feature Modal',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: useFullScreen
    });
  }

}

export const characterGeneralComponent = {
  controller: CharacterGeneralController,
  templateUrl: 'app/character/general/general.component.html'
};
