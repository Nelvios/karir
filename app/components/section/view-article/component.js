import Component from '@ember/component';
import { get, set } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',

  didRender() {
    this._super(...arguments);
    const content = get(this, 'model.article');

    if(content) {
      set(this, 'model.article', content.replace(/="assets/g, '="/assets'));
    }
  }

});
