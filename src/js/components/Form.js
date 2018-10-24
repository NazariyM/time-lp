import Popup from 'vintage-popup';
import Inputmask from 'inputmask';
import { css } from '../_helpers';

class Form {
  constructor(formEl) {
    this.$form = $(formEl);
    this.$telInput = this.$form.find('.js-tel-input');
    // this.$formSubmit = this.$form.find('button[type="submit"]');

    this.init();
  }

  init() {
    this.maskInput();
    this.initThanksPop();
  }

  maskInput() {
    const _this = this;
    const im = new Inputmask({
      mask: '+7 (999) 999-99-99',
      showMaskOnHover: false,
      showMaskOnFocus: true,
      onincomplete() {
        this.value = '';
      }
    });
    im.mask(this.$telInput);
  }

  initThanksPop() {
    const _this = this;

    this.$form.on('submit', function(e) {
      e.preventDefault();
      const $this = $(this);

      if (_this.checkError()) {
        Popup.closeAllPopups();
        const thanskPopInstance = $('.thanks-popup__btn').popup();
        thanskPopInstance.open();

        setTimeout(() => {
          $this[0].reset();
          thanskPopInstance.close();
        }, 2000);
      }
    });
  }

  checkError() {
    const $field = this.$telInput.parent();

    if (this.$telInput.val() === '') {
      $field
        .addClass(css.error);
      setTimeout(() => {
        $field
          .removeClass(css.error);
      }, 2000);
      return false;
    } else {
      return true;
    }
  }
}

const $form = $('.js-form');
$form.each((i, el) => { new Form(el); });
