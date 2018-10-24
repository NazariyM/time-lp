import 'jquery-parallax.js';
import { Resp, isSafari, $body } from '../_helpers';

class Parallax {
  constructor(el) {
    this.$block = $(el);

    this.$content = this.$block.find('.parallax__content');
    this.$fallBackLayer = this.$block.find('.parallax__fallback');

    this.init();
  }

  init() {
    if (isSafari) {
      $body.addClass('is-parallax-fallback');

      if (isSafari && !Resp.isDesk) this.setBg();
    }
    if (isSafari && Resp.isDesk) this.parallax();
    if (!isSafari) this.setHeight();
  }

  setHeight() {
    const blockH = this.$block.outerHeight();
    const contentH = this.$content.outerHeight();
    this.$block.css({
      height: `${blockH + contentH}px`
    });
  }

  parallax() {
    this.$fallBackLayer.attr('data-parallax', 'scroll');
  }

  setBg() {
    this.$fallBackLayer.removeAttr('data-parallax').addClass('is-safari');
    const img = this.$fallBackLayer.data('mob-img-src');

    this.$fallBackLayer.css('background-image', `url(${img})`);
  }
}

const $parallax = $('.parallax');
$parallax.each(function(i, el) {
  new Parallax(el);
});
