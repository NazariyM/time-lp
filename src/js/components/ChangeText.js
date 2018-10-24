import {css} from '../_helpers';

class ChangeText {
  constructor() {
    this.$el = $('[data-change-text]');

    if (this.$el.length) this.init();
  }

  bindEvents() {
    this.$el.on('click tap', (e) => {
      e.preventDefault();
      this.initChange(e.currentTarget);
    });
  }

  init() {
    this.bindEvents();
  }

  initChange(el) {
    $(el).hasClass('is-active') ? $(el).text($(el).data('default-text')) : $(el).text($(el).data('change-text'));
    $(el).toggleClass(css.active);
  }

}

export default new ChangeText();
