import Component from '@ember/component';
import { jQ, get, set } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',
  autoScroll: null,

  didInsertElement() {
    this._super(...arguments);
    const carousel = this.$('.carousel');
    const scrollTime = 4500;      // in milliseconds

    carousel.carousel({
      fullWidth: true,
      indicators: true
    });

    carousel.on('mouseenter.carousel', () => clearTimeout(get(this, 'autoScroll')));
    carousel.on('mouseleave.carousel', () => this.send('autoScroll', scrollTime));

    carousel.triggerHandler('mouseleave.carousel');
  },

  willDestroyElement() {
    this._super(...arguments);

    clearTimeout(get(this, 'autoScroll'));
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
        const size = jQ('body').attr('data-size');
        if(size !== 'sm') carousel.carousel('next');
      }, time);

      set(this, 'autoScroll', interval);
    }
  }

});
