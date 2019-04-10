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

    store.findAll('article').then(result => {
      set(this, 'isLoading', false);
      set(this, 'model', result.filter((item, idx) => idx < 3));
    });
  }

});
