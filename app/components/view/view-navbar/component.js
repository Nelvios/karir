import Component from '@ember/component';
import { jQ } from 'karir/utils/short';

export default Component.extend({

  tagName: 'nav',

  didInsertElement() {
    this._super(...arguments);
    const THRESHOLD = 16;
    const body = jQ('body');

    jQ(window).scroll(() => {

      if(jQ(window).scrollTop() > THRESHOLD) {
        body.removeClass('navbar-top');
      } else {
        body.addClass('navbar-top');
      }

    });
    jQ(window).scroll();
  }

});
