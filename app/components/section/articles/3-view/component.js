import Component from '@ember/component';
import { get, set, computed, alias } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',
  article: alias('model'),

  tags: computed('article.tags', {
    get() {
      const tags = get(this, 'article.tags') ? get(this, 'article.tags').split(',') : [];

      return tags.map(tag => tag.trim());
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
