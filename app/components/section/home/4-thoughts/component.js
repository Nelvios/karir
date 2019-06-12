import Component from '@ember/component';
import { set, service } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',
  store: service(),

  model: null,
  isLoading: true,

  didInsertElement() {
    this._super(...arguments);
    const store = this.get('store');
    const slider = this.$('.slider');

    slider.slider({indicators: false});
    slider.slider('pause');

    store.findAll('thought').then(result => {
      set(this, 'isLoading', false);
      set(this, 'model', result);
    });
  },

  didUpdate() {
    this._super(...arguments);
    this.$('.tooltip').tooltip();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.$('.tooltip').tooltip('destroy');
  },

  actions: {
    moveToPrev(){
      this.$('.slider').slider('prev');
      this.$('.slider').slider('pause');
    },
    moveToNext(){
      this.$('.slider').slider('next');
      this.$('.slider').slider('pause');
    }
  }

});
