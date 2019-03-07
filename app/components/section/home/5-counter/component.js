import Component from '@ember/component';
import { jQ } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',

  didInsertElement() {
    this._super(...arguments);
    const btn = this.$('.btn.apply');

    let threshold = this._getThreshold();

    jQ(window).on('scroll.apply-btn', () => {
      const scroll = jQ(window).scrollTop();

      if(scroll > threshold[0]) {
        btn.removeClass('top');
      } else {
        btn.addClass('top');
      }

      if(scroll > threshold[1]) {
        btn.removeClass('float');
      } else {
        btn.addClass('float');
      }
    });
    jQ(window).scroll();

    jQ(window).on('resize.apply-btn', () => {
      threshold = this._getThreshold();
      jQ(window).scroll();
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    jQ(window).off('scroll.apply-btn').off('resize.apply-btn');
  },

  _getThreshold() {
    const carousel = jQ('#home-carousel');
    const counter = this.$();
    const btn = this.$('.btn.apply');

    return [
      carousel.offset().top - jQ(window).height() + carousel.outerHeight() - 100,
      counter.offset().top - jQ(window).height() + counter.outerHeight()/2 + btn.height()/2 + 30
    ];
  }

});
