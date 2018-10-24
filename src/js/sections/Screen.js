import { TimelineMax } from 'gsap';
import { detectIE, Resp } from '../_helpers';

class Screen {
  constructor() {
    this.block = document.querySelector('.screen');

    if (!this.block) return;

    this.title = this.block.querySelector('.screen__title');
    this.aboutItems = this.block.querySelector('.screen__about').children;
    this.img = this.block.querySelector('.screen__img-el');
    this.tl = new TimelineMax();

    this.init();
  }

  init() {
    if (!Resp.isMobile) this.anim();
    this.fixIEImage();
  }

  anim() {
    const people = this.img.querySelector('.screen__img-people');
    const location = this.img.querySelector('.screen__img-location');
    const gear = this.img.querySelector('.screen__img-gear');
    const lamp = this.img.querySelector('.screen__img-lamp');
    const calendar = this.img.querySelector('.screen__img-calendar');

    this.tl
      .to(this.title, 1, { autoAlpha: 1 })
      .staggerTo(this.aboutItems, 0.3, { autoAlpha: 1, x: 0 }, 0.15)
      .to(people, 0.7, { autoAlpha: 1 })
      .fromTo(calendar, 0.4, { x: -50 }, {autoAlpha: 1, x: 0 })
      .fromTo(location, 0.4, { x: 50 }, {autoAlpha: 1, x: 0 })
      .fromTo(gear, 0.6, { x: 80, y: 85, scale: 0.3 }, {autoAlpha: 1, x: 0, y: 0, scale: 1 })
      .fromTo(lamp, 0.6, { x: 0, y: 85, scale: 0.3 }, {autoAlpha: 1, x: 0, y: 0, scale: 1 });
  }

  fixIEImage() {
    if (detectIE()) {
      this.img.style.width = '463px';
      this.img.style.height = '503px';
    }
  }
}

export default new Screen();
