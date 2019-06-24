import Component from '@ember/component';
import { jQ, get, service } from 'karir/utils/short';
import { getProperties } from '@ember/object';

export default Component.extend({

  tagName: 'section',
  store: service(),

  counters: null,

  didInsertElement() {
    this._super(...arguments);
    const btn = this.$('.btn.apply');
    const store = get(this, 'store');

    // store.findAll('counter').then(result => set(this, 'counters', result))
    store.findAll('counter').then(result => result.forEach((item) => {
      this.set('counters', getProperties(item,'employCount'));
    }))


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

    jQ(window).on('resize.apply-btn', () => jQ(window).triggerHandler('scroll.apply-btn'));
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
      top:    benefits.offset().top - jQ(window).height() + 100,
      bottom: counter.offset().top - jQ(window).height() + counter.outerHeight()/2 + btn.height()/2 + 30
    };
  }

});
