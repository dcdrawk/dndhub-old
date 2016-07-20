/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';

import 'firebase';
import 'angular-ui-router';
import 'angular-material';
import 'angular-highlightjs';
import 'jQuery';

import routesConfig from './routes';
import themeConfig from './app/theme';

import {main} from './app/main';
import {header} from './app/layout/header';
import {sidenav} from './app/layout/sidenav';
import {title} from './app/title';
import {footer} from './app/layout/footer';

import {Buttons} from './app/pages/components/buttons/buttons';
import {typographyPage} from './app/pages/styles/typography.component';

//Directives
import fileread from './app/directives/fileread';

//Services
import ToastService from './app/services/toast.service';

import FirebaseService from './app/pages/firebase/firebase.service';
import {firebaseComponent} from './app/pages/firebase/firebase.component';
import {profileComponent} from './app/pages/firebase/profile.component';
import {signUpComponent} from './app/pages/firebase/sign-up.component';

import './index.scss';

angular
  .module('app', ['ui.router', 'ngMaterial', 'hljs'])
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
  .component('buttons', Buttons)
  .component('firebase', firebaseComponent)
  .component('signup', signUpComponent)
  .component('profile', profileComponent)
  .component('typography', typographyPage);
