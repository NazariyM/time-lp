import 'jquery.dotdotdot';
import { TweenMax } from 'gsap';
import { $window, throttle, css } from '../_helpers';

class TextCrop {
  constructor(el) {
    this.$block = $(el);

    this.init();

    this.$el = this.$block.find('.text-crop__el');
    this.$btn = this.$block.find('.text-crop__expand-btn');
    this.$btnWrap = this.$block.find('.text-crop__btn-wrap');
  }

  init() {
    $window.on('load', () => {
      this.initDot();
      this.onResize();
      this.$btn.on('click', () => this.toggleText());
    });
  }

  onResize() {
    const reinitDot = throttle(() => {
      this.destroy();
      this.initDot();
    }, 250, this);

    $window.on('resize orientationchange', reinitDot);
  }

  initDot() {
    this.$el.dotdotdot();
    this.API = this.$el.data('dotdotdot');
  }

  toggleText() {
    if (!this.$block.hasClass('is-active')) {
      this.destroy();
      TweenMax.to(this.$btnWrap, 0, { autoAlpha: 0 });
      setTimeout(() => {
        TweenMax.to(this.$btnWrap, 0.3, { autoAlpha: 1 });
      }, 500);
    } else {
      this.API.truncate();
    }
    this.$block.toggleClass(css.active);

  }

  destroy() {
    this.API.restore();
  }
}

$('.text-crop').each((i, el) => {
  new TextCrop(el);
});
