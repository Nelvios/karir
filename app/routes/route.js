import Route from '@ember/routing/route';
import { jQ, get, run, computed } from 'karir/utils/short';

export default Route.extend({

  screenHeight: computed({
    get() {
      return jQ(window).outerHeight();
    }
  }).volatile(),

  beforeModel() {
    this._super(...arguments);
    jQ(window).resize(() => this.send('resize'));
    console.log('before model');
  },

  actions: {

    resize() {
      // run.later(() => {
        let height = get(this, 'screenHeight');
        console.log('height', height);
        jQ('.slice').css('min-height', height);
      // }, 100);
    },

    scrollDown() {
      jQ('html, body').animate({
        scrollTop: `+=${get(this, 'screenHeight')}`
      }, 'slow');
    },

    scrollUp() {
      jQ('html, body').animate({
        scrollTop: `-=${get(this, 'screenHeight')}`
      }, 'slow');
    }
  }

});
