import Component from '@ember/component';
import { jQ, set } from 'karir/utils/short';

export default Component.extend({

  tagName: 'nav',
  classNameBindings: ['isTop:top'],

  didInsertElement() {
    this._super(...arguments);
    const THRESHOLD = 16;

    jQ(window).scroll(() => {

      if(jQ(window).scrollTop() > THRESHOLD) {
        set(this, 'isTop', false);
      } else {
        set(this, 'isTop', true);
      }

    });
    jQ(window).scroll();
  }

});
