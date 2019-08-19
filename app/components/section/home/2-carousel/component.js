import Component from '@ember/component';
import { jQ, get, set } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',
  autoScroll: null,

  didInsertElement() {
    this._super(...arguments);
    const carousel = this.$('.carousel');
    const scrollTime = 4500;      // in milliseconds

    jQ(window).on('resize.carousel', () => {
      carousel.carousel({
        fullWidth: true,
        indicators: true
      });

      // Remove extra indicators
      carousel.find('.indicators').last().siblings('.indicators').remove();
    });

    jQ(window).triggerHandler('resize.carousel');


    carousel.mouseenter(() => clearTimeout(get(this, 'autoScroll')));
    carousel.mouseleave(() => this.send('autoScroll', scrollTime));

    carousel.mouseleave();
  },

  willDestroyElement() {
    this._super(...arguments);

    clearTimeout(get(this, 'autoScroll'));
    jQ(window).off('resize.carousel');
  },

  actions: {

    prev() {
      this.$('.carousel').carousel('prev');
    },

    next() {
      this.$('.carousel').carousel('next');
    },

    autoScroll(time) {
      const carousel = this.$('.carousel');
      const interval = setInterval(() => {
        // carousel.carousel('next');
      }, time);

      set(this, 'autoScroll', interval);
    }
  }

});
