import 'slick-carousel';
import { svgIcon } from '../_helpers';

class Slider {
  constructor({ el= '.js-slider', slidesToShow = 1, slidesToScroll = 1, ...opts } = {}) {
    this.$slider = $(el);
    this.slidesToShow = slidesToShow;
    this.slidesToScroll = slidesToScroll;
    this.responsive = opts.responsive;
    this.arrows = opts.arrows || false;
    this.infinite = opts.infinite || false;
    this.function = opts.function || false;
    this.dots = opts.dots || false;
    this.dotsClass = opts.dotsClass || 'slider-dots';
    this.appendArrows = opts.appendArrows;
    this.appendDots = opts.appendDots;
    this.transform = opts.transform || true;
    this.speed = opts.speed || 800;
    this.ease = opts.ease;
    this.function = opts.function || false;

    const icon = svgIcon('arrow');

    this.defaultOptions = {
      slidesToShow: this.slidesToShow,
      slidesToScroll: this.slidesToScroll,
      infinite: this.infinite,
      speed: this.speed,
      useTransform: this.transform,
      adaptiveHeight: false,
      accessibility: false,
      swipe: true,
      arrows: this.arrows,
      prevArrow: `<button type="button" class="slider-btn slider-btn_prev">${icon}</button>`,
      nextArrow: `<button type="button" class="slider-btn slider-btn_next">${icon}</button>`,
      dots: this.dots,
      dotsClass: this.dotsClass,
      appendArrows: this.appendArrows,
      appendDots: this.appendDots,
      rows: 0,
      responsive: this.responsive,
      cssEase: this.ease
    };

    if (this.$slider.length) this.init();
  }

  init() {
    this.initSlider();
  }

  initSlider() {
    this.$slider.slick($.extend({}, this.defaultOptions));

    if (this.function) {
      if (typeof this.function !== 'function') return;
      this.function();
    }
  }
}

export default new Slider();

const teamSld = new Slider({
  el: '.js-team-slider',
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: true,
  arrows: true,
  responsive: [
    {
      breakpoint: 1199,
      settings: {
        slidesToShow: 3
      }
    }, {
      breakpoint: 1023,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 767,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});

const testimonSld = new Slider({
  el: '.js-testimonials-slider',
  slidesToShow: 2,
  slidesToScroll: 1,
  infinite: true,
  arrows: true,
  responsive: [
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 1
      }
    }
  ]
  // function() {
  //   this.$slider.on('init afterChange reInit', (e, slick, currentSlide) => {
  //     $('.text-crop__el').each((i, el) => {
  //       $(el).data('dotdotdot').truncate();
  //     });
  //   });
  // }
});
