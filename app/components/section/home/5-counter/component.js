import Component from '@ember/component';
import { jQ, get, set, service } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',
  store: service(),

  counter: 0,

  didInsertElement() {
    this._super(...arguments);
    const btn = this.$('.btn.apply');
    const store = get(this, 'store');

    store.findAll('counter').then(result => {
      const counter = get(result.objectAt(0), 'employCount');
      set(this, 'counter', counter);
    });

    jQ(window).on('scroll.apply-btn', () => {
      const threshold = this._getThreshold() || {};
      const scroll = jQ(window).scrollTop();

      if(scroll > threshold.top) {
        btn.removeClass('top');
      } else {
        btn.addClass('top');
      }

      if(scroll > threshold.bottom) {
        btn.removeClass('float');
      } else {
        btn.addClass('float');
      }
    });

    jQ(window).on('resize.apply-btn', () => {
      const size = jQ('body').attr('data-size');

      if(size === 'sm') btn.addClass('btn-small');
      else btn.removeClass('btn-small');

      jQ(window).triggerHandler('scroll.apply-btn');
    });
  },

  didUpdate() {
    this._super(...arguments);

    jQ(window).triggerHandler('resize.apply-btn');
  },

  willDestroyElement() {
    this._super(...arguments);

    jQ(window).off('scroll.apply-btn').off('resize.apply-btn');
  },

  _getThreshold() {
    const benefits = jQ('#home-benefits');
    const counter = this.$();
    const btn = this.$('.btn.apply');

    return {
      top:    benefits.offset().top - jQ(window).height() + 200,
      bottom: counter.offset().top - jQ(window).height() /* + counter.outerHeight()/2 */ + btn.height()/2 + 30
    };
  }

});
