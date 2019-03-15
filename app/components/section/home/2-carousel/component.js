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
      indicators: true,
      onCycleTo: (el) => {
        const classNames = ['ember-view'];
        classNames.pushObject(jQ(el).attr('data-color'));
        classNames.compact();

        this.$().attr('class', classNames.join(' '));
      }
    });

    carousel.mouseenter(() => clearTimeout(get(this, 'autoScroll')));
    carousel.mouseleave(() => this.send('autoScroll', scrollTime));

    carousel.mouseleave();
  },

  willDestroyElement() {
    this._super(...arguments);

    clearTimeout(get(this, 'autoScroll'));
  },

  actions: {

    autoScroll(time) {
      const interval = setInterval(() => {
        this.$('.carousel').carousel('next');
      }, time);

      set(this, 'autoScroll', interval);
    }
  }

});
