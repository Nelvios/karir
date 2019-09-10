import Component from '@ember/component';
import { get, set, computed, alias } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',
  article: alias('model'),

  tags: computed('article.tag', {
    get() {
      const tags = get(this, 'article.tag') ? get(this, 'article.tag').split(',') : [];

      return tags.map(tag => tag.trim()).sort();
    }
  }),

  didRender() {
    this._super(...arguments);
    const content = get(this, 'model.article');

    if(content) {
      set(this, 'model.article', content.replace(/="assets/g, '="/assets'));
    }
  }

});
