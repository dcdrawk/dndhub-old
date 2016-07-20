/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';

import 'firebase';
import 'angular-ui-router';
import 'angular-material';
import 'angular-highlightjs';
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

//-- Pages --

//Authentication
import {firebaseComponent} from './app/pages/firebase/firebase.component';
import {profileComponent} from './app/pages/firebase/profile.component';
import {signUpComponent} from './app/pages/firebase/sign-up.component';

//Characters
import {characterListComponent} from './app/pages/character/character-list.component';

//Demo Pages
// import {Buttons} from './app/pages/components/buttons/buttons';
// import {typographyPage} from './app/pages/styles/typography.component';

//SCSS
import './index.scss';

angular
  .module('app', ['ui.router', 'ngMaterial', 'hljs', 'md.data.table'])
  .config(routesConfig)
  .config(themeConfig)
  .service('FirebaseService', FirebaseService)
  .service('ToastService', ToastService)
  .directive('fileread', fileread)
  .component('app', main)
  .component('header', header)
  .component('sidenav', sidenav)
  .component('fountainTitle', title)
  .component('fountainFooter', footer)
  .component('firebase', firebaseComponent)
  .component('signup', signUpComponent)
  .component('profile', profileComponent)

  .component('characterlist', characterListComponent)
  // .component('buttons', Buttons)
  // .component('typography', typographyPage);
