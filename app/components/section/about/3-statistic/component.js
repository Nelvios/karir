import Component from '@ember/component';
import { jQ, get, service } from 'karir/utils/short';
import { getProperties } from '@ember/object';

export default Component.extend({

  tagName:'section',
  store: service(),

  counters: null,

  didInsertElement() {
    this._super(...arguments);
    const store = get(this, 'store');

    store.findAll('counter').then(result => result.forEach((item) => {
      this.set('counters', getProperties(item,'employCount'));
    }))
  }

});
