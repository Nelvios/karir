import Component from '@ember/component';
import { get, set, computed } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',

  model: null,
  // isLoading: true,

  size: 3,
  index: 0,

  articles: computed('model.[]', {
    get() {
      return get(this, 'model').sortBy('date', 'id').reverseObjects().filter((item, idx) => idx < get(this, 'size'));
    }
  }),

  top: computed('articles', 'index', {
    get() {
      const model = get(this, 'articles');
      const index = get(this, 'index');

      return model ? model.objectAt(index) : {};
    }
  }),

  counters: computed('size', {
    get() {
      const arr = [], size = get(this, 'size');
      for(let i = 0; i < size; i++) arr.pushObject('');

      return arr;
    }
  }),

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
    },

    jump(idx) {
      set(this, 'index', idx);
    }
  }

});
