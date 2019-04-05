import Component from '@ember/component';
import { jQ } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',

  didInsertElement() {
    this._super(...arguments);
    const carousel = this.$('.carousel');

    jQ(window).on('resize.carousel', () => this.send('carousel', carousel));

    jQ(window).resize();
  },

  willDestroyElement() {
    jQ(window).off('resize.carousel');
  },

  actions: {

    carousel(el) {
      const isExist = !!el.get(0).M_Carousel;

      if(isExist) {
        el.find('.indicators').remove();
        el.carousel('destroy').carousel({ indicators: true });
      } else el.carousel({ indicators: true });
    }
  }

});
