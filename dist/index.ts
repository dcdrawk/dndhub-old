/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';

import 'firebase';
import 'angular-ui-router';
import 'angular-material';
import 'angular-messages';
import 'angular-highlightjs';
import 'angular-validation-match';
import 'jQuery';
import 'fastclick';

//-- Config --
import routesConfig from './routes';
import themeConfig from './app/theme';

//-- Layout --
import {main} from './app/main';
import {header} from './app/layout/header';
import {sidenav} from './app/layout/sidenav';
import {title} from './app/title';
import {footer} from './app/layout/footer';

//-- Directives --
import fileread from './app/directives/fileread';

//-- Services --
import ToastService from './app/services/toast.service';
import FirebaseService from './app/firebase/firebase.service';
import GameDataService from './app/firebase/game-data.service';
import CacheService from './app/services/cache.service';

//Authentication
import {signInComponent} from './app/firebase/sign-in.component';
import {profileComponent} from './app/firebase/profile.component';
import {signUpComponent} from './app/firebase/sign-up.component';

// -- Character Components --
import {characterListComponent} from './app/character/character-list/character-list.component';
import {newCharacterModalComponent} from './app/character/new-character/new-character-modal.component';
import {characterGeneralComponent} from './app/character/general/general.component';
import {characterStatsComponent} from './app/character/stats/stats.component';
import {characterFeatsComponent} from './app/character/feats/feats.component';
import {characterFeatsModalComponent} from './app/character/feats/feats-modal.component';
import {characterWeaponsComponent} from './app/character/weapons/weapons.component';
import {characterWeaponsModalComponent} from './app/character/weapons/weapons.modal.component';
import {characterArmorComponent} from './app/character/armor/armor.component';
import {characterArmorModalComponent} from './app/character/armor/armor.modal.component';
import {characterSpellsComponent} from './app/character/spells/spells.component';
import {characterSpellsModalComponent} from './app/character/spells/spells.modal.component';
import {classFeatureModalComponent} from './app/character/general/class-feature.modal.component';

// -- Character Services --
import CharacterService from './app/character/character.service';
import GeneralService from './app/character/general/general.service';
import StatsService from './app/character/stats/stats.service';
import FeatsService from './app/character/feats/feats.service';
import WeaponsService from './app/character/weapons/weapons.service';
import ArmorService from './app/character/armor/armor.service';
import SpellsService from './app/character/spells/spells.service';
// import InventoryService from './app/character/inventory/inventory.service';

//SCSS
import './index.scss';

angular
  .module('app', ['ui.router', 'ngMessages', 'ngMaterial', 'hljs', 'md.data.table', 'validation.match'])
  .config(routesConfig)
  .config(themeConfig)
  .service('FirebaseService', FirebaseService)
  .service('GameDataService', GameDataService)
  .service('ToastService', ToastService)
  .service('CacheService', CacheService)
  
  .directive('fileread', fileread)

  //Layout
  .component('app', main)
  .component('header', header)
  .component('sidenav', sidenav)
  .component('fountainTitle', title)
  .component('fountainFooter', footer)
  
  //Character Components
  .component('newCharacterModal', newCharacterModalComponent)
  .component('characterlist', characterListComponent)
  .component('characterGeneral', characterGeneralComponent)
  .component('classFeatureModal', classFeatureModalComponent)
  .component('characterStats', characterStatsComponent)
  .component('characterFeats', characterFeatsComponent)
  .component('characterFeatsModal', characterFeatsModalComponent)
  .component('characterWeapons', characterWeaponsComponent)
  .component('characterWeaponsModal', characterWeaponsModalComponent)
  .component('characterArmor', characterArmorComponent)
  .component('characterArmorModal', characterArmorModalComponent)
  .component('characterSpells', characterSpellsComponent)
  .component('characterSpellsModal', characterSpellsModalComponent)

  //Character Services
  .service('CharacterService', CharacterService)
  .service('GeneralService', GeneralService)
  .service('StatsService', StatsService)
  .service('FeatsService', FeatsService)
  .service('WeaponsService', WeaponsService)
  .service('ArmorService', ArmorService)
  .service('SpellsService', SpellsService)
  // .service('InventoryService', InventoryService)


  //Auth
  .component('signIn', signInComponent)
  .component('signUp', signUpComponent)
  .component('profile', profileComponent);
