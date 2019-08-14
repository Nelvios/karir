import Component from '@ember/component';
import { get, set, service } from 'karir/utils/short';

export default Component.extend({

  tagName:'section',
  store: service(),

  counters: null,

  didInsertElement() {
    this._super(...arguments);
    const store = get(this, 'store');

    store.findAll('counter').then(result => set(this, 'counters', get(result[0], 'employCount')));
  }

});
