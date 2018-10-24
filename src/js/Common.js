import objectFitImages from 'object-fit-images';
import { $body, detectIE } from './_helpers';

import './components/Header';
import './components/Popups';
import './components/Form';
import './components/Sliders';
import './components/ScrollAnim';
import './components/Anims';
import './components/TextCrop';
import './components/ChangeText';
import './components/Parallax';

import './sections/Screen';

export class Common {
  constructor() {
    this.init();
  }

  init() {
    objectFitImages();
    this.addClassIE();
  }

  addClassIE() {
    if (detectIE()) $body.addClass('is-ie');
  }
}

export default new Common();
