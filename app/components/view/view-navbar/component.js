import Component from '@ember/component';
import { SCREEN_HEIGHT } from 'karir/utils/properties';
import { jQ } from 'karir/utils/short';

export default Component.extend({

  tagName: 'nav',
  classNames: [
    'navbar top',
    'fixed-top',
    'navbar-expand-lg',
    'navbar-dark',
  ],

  didInsertElement () {
    this._super(...arguments);

    this.send('scroll');
    jQ(window).scroll(() => this.send('scroll'));
  },

  actions: {

    scroll() {
      jQ(window).scroll(() => {
        let top = jQ(window).scrollTop();
  
        if (top < SCREEN_HEIGHT) {
          this.$().addClass('top');
        } else {
          this.$().removeClass('top');
        }
      });
    }
  }

});
