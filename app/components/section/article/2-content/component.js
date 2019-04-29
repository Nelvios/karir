import Component from '@ember/component';
import { get, set, service } from '../../../../utils/short';

export default Component.extend({

  tagName: 'section',
  store:service(),

  articles:null,

  didInsertElement(){
    this._super(...arguments);
    const store = get(this, 'store');

    store.findAll('article').then(result => set(this, 'articles', result));
  }

});
