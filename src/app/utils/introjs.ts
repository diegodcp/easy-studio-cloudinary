import { Injectable } from '@angular/core';
const IntroJs = require('../../../node_modules/intro.js/intro.js');

@Injectable({
  providedIn: 'root'
})
export class IntroJsUtil {

  constructor(
  ) { }

  initIntroJS() {
    IntroJs().setOptions({
        steps:  [{
                    element: '#step1',
                    intro: 'Select the layout you prefer, for example \'Portrait\' for your social media.',
                    title: 'Step 1',
                    position: 'bottom'
                },
                {
                    element: '#step2',
                    intro: 'Resize, change the opacity, the saturation, add overlay text and much more!'+
                    ' But if you want we can do all for you, just click on the \'Magic button\' to get the best format and quality.',
                    title: 'Step 2',
                    position: 'bottom'
                },
                {
                    element: '#step3',
                    intro: 'After changes click the button to make them take effect.',
                    title: 'Step 3',
                    position: 'right'
                },
                {
                    element: '#step4',
                    intro: 'In this section you have several options to apply amazing filters.',
                    title: 'Step 3',
                    position: 'top'
                },
                {
                    element: '#step5',
                    intro: 'Once your image is beautiful and perfect, click the \'Download image\' button at the right-top.',
                    title: 'Step 4',
                    position: 'right'
                }],
                showBullets: false,
                showButtons: true,
                exitOnOverlayClick: false
    }).start();
  }

}
