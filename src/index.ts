/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';

import 'firebase';
import 'angular-ui-router';
import 'angular-material';
import 'angular-messages';
import 'angular-highlightjs';
import 'angular-validation-match';
import 'jQuery';

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
import FirebaseService from './app/pages/firebase/firebase.service';
import GameDataService from './app/pages/firebase/game-data.service';
import CharacterService from './app/pages/character/character.service';
//-- Pages --

//Authentication
import {firebaseComponent} from './app/pages/firebase/firebase.component';
import {profileComponent} from './app/pages/firebase/profile.component';
import {signUpComponent} from './app/pages/firebase/sign-up.component';

//Characters
import {characterListComponent} from './app/pages/character/character-list.component';
import {newCharacterModalComponent} from './app/pages/character/new-character-modal.component';
import {characterInfoComponent} from './app/pages/character/character-info.component';
import {characterGeneralComponent} from './app/pages/character/general/general.component';
import {characterStatsComponent} from './app/pages/character/stats/stats.component';
import {characterFeatsComponent} from './app/pages/character/feats/feats.component';
import {characterFeatsModalComponent} from './app/pages/character/feats/feats-modal.component';
import {characterWeaponsComponent} from './app/pages/character/weapons/weapons.component';

//SCSS
import './index.scss';

angular
  .module('app', ['ui.router', 'ngMessages', 'ngMaterial', 'hljs', 'md.data.table', 'validation.match'])
  .config(routesConfig)
  .config(themeConfig)
  .service('FirebaseService', FirebaseService)
  .service('GameDataService', GameDataService)
  .service('ToastService', ToastService)
  .service('CharacterService', CharacterService)
  .directive('fileread', fileread)

  //Layout
  .component('app', main)
  .component('header', header)
  .component('sidenav', sidenav)
  .component('fountainTitle', title)
  .component('fountainFooter', footer)
  
  //Character
  .component('newCharacterModal', newCharacterModalComponent)
  .component('characterlist', characterListComponent)
  .component('characterInfo', characterInfoComponent)
  .component('characterGeneral', characterGeneralComponent)
  .component('characterStats', characterStatsComponent)
  .component('characterFeats', characterFeatsComponent)
  .component('characterFeatsModal', characterFeatsModalComponent)
  .component('characterWeapons', characterWeaponsComponent)

  //Auth
  .component('firebase', firebaseComponent)
  .component('signup', signUpComponent)
  .component('profile', profileComponent);
