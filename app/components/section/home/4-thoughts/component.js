import Component from '@ember/component';
import { get, set, computed, service } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',
  store: service(),

  model: null,
  isLoading: true,

  size: 3,
  index: 0,

  show: computed('model', 'index', {
    get() {
      const model = get(this, 'model');
      const index = get(this, 'index');

      return model ? model.objectAt(index) : {};
    }
  }),

  didInsertElement() {
    this._super(...arguments);
    const store = this.get('store');

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

    prev() {
      const size = get(this, 'size') - 1;
      const idx = get(this, 'index') - 1;

      set(this, 'index', idx < 0 ? size : idx);
    },

    next() {
      const size = get(this, 'size') - 1;
      const idx = get(this, 'index') + 1;

      set(this, 'index', idx > size ? 0 : idx);
    }
  }

});
