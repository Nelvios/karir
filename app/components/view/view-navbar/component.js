import Component from '@ember/component';
import { SCREEN_HEIGHT } from 'karir/utils/properties';
import { jQ } from 'karir/utils/short';

export default Component.extend({

  tagName: 'nav',
  classNames: [
    'navbar',
    'fixed-top',
    'navbar-expand-lg',
    'navbar-dark',
  ],

  didInsertElement () {
    jQ(window).scroll(() => {
      let top = jQ(window).scrollTop();

      if (top < SCREEN_HEIGHT) {
        this.$().removeClass('bg-dark');
      } else {
        this.$().addClass('bg-dark');
      }
    });
  }

});
