import 'gsap/ScrollToPlugin';
import {
  throttle,
  css,
  Resp,
  isSafari,
  detectIE
} from '../_helpers';

class Header {
  constructor() {
    this.body = document.querySelector('body');
    this.header = document.querySelector('.header');
    this.logo = this.header.querySelector('.header__logo');
    this.nav = this.header.querySelector('.nav');
    this.navLinks = this.nav.querySelector('.nav__list');
    this.navBtn = this.header.querySelector('.nav-btn');
    this.$wrapper = $('.wrapper');
    this.browsersFix = !isSafari && Resp.isDesk && !detectIE() || Resp.isMobilesDevices && !isSafari;

    this.init();
  }

  init() {
    if (this.browsersFix) {
      this.fixPosForOthers();
    } else {
      this.fixPosition();
    }

    this.initScroll();
    this.bindEvents();
  }

  bindEvents() {
    this.navBtn.addEventListener('click', () => {
      this.toggleMenu();
    });
		 this.onResize();
  }

  onResize() {
    window.onresize = () => {
      this.navBtn.classList.remove(css.active);
      this.nav.classList.remove(css.active);
    };
  }

  toggleMenu() {
    this.navBtn.classList.toggle(css.active);
    this.nav.classList.toggle(css.active);
  }

  fixPosForOthers() {
    const _this = this;

    const toggleHeaderScroll = throttle((e) => {
      toggleHeader(e);
    }, 0, this);

    function toggleHeader() {
      if (_this.$wrapper.scrollTop() > 0) {
        _this.header.classList.add(css.fixed);
      } else {
        _this.header.classList.remove(css.fixed);
      }
    }

    this.$wrapper.on('scroll', toggleHeaderScroll);
  }

  fixPosition() {
    const _this = this;

    if (window.pageYOffset > 0) {
      _this.header.classList.add(css.fixed);
    }

    const toggleHeaderScroll = throttle((e) => {
      toggleHeader(e);
    }, 0, this);

    function toggleHeader() {
      if (window.pageYOffset > 0) {
        _this.header.classList.add(css.fixed);
      } else {
        _this.header.classList.remove(css.fixed);
      }
    }

    window.addEventListener('scroll', toggleHeaderScroll);
  }

  initScroll() {
    const _this = this;
    const offsetTop = Resp.isDesk ? 50 : 60;

    this.logo.addEventListener('click', (e) => {
      e.preventDefault();
      const scrollEl = this.browsersFix ? _this.$wrapper : window;

      TweenMax.to(scrollEl, 1.5, {
        scrollTo: { y: 0, autoKill: false }
      });
    });

    [...this.navLinks.querySelectorAll('a')].forEach(item => {
      item.addEventListener('click', (e) => {
        if (item.href.indexOf('#') !== -1) {
          e.preventDefault();
          const href = item.href;
          const hashName = href.slice(href.indexOf('#') + 1, href.length);
          const scrollEl = this.browsersFix ? _this.$wrapper : window;
          const scrollDistance = this.browsersFix ? _this.$wrapper.scrollTop() : window.pageYOffset;

          _this.nav.classList.remove(css.active);
          _this.navBtn.classList.remove(css.active);

          TweenMax.to(scrollEl, 1.5, {
            scrollTo: {
              y: document.getElementById(hashName).getBoundingClientRect().top + scrollDistance - offsetTop,
              autoKill: false
            }
          });
        }
      });
    });
  }
}

export const HeaderAPI = new Header();
