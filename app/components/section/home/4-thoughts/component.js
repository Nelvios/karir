import Component from '@ember/component';
import { jQ, set, service } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',
  store: service(),

  model: null,
  isLoading: true,

  didInsertElement() {
    this._super(...arguments);
    const store = this.get('store');

    store.findAll('thought').then(result => {
      set(this, 'isLoading', false);
      set(this, 'model', result);
    });
  },

  didRender() {
    this._super(...arguments);
    this.$('.tooltip').tooltip();
    jQ(window).resize();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.$('.tooltip').tooltip('destroy');
  }

});
