import 'angular-material';

class TypographyController {

  constructor() {
    console.log('typography controller');
  }

  init() {
    console.log('init');
  }

}

export const typographyPage = {
  controller: TypographyController,
  templateUrl: 'app/pages/styles/typography.component.html'
};
