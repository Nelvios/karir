import Controller from '@ember/controller';
import { get, set, computed, moment } from 'karir/utils/short';

export default Controller.extend({

  queryParams:['month', 'tags'],
  month: null,
  tags: null,

  length: 0,
  increment: 4,
  counter: 1,

  articles: computed('month', 'tags.[]', 'size', {
    get() {
      const month = get(this, 'month');
      const tags = get(this, 'tags') ? get(this, 'tags').split(',') : null;
      const size = get(this, 'size');
      let articles = get(this, 'model');

      if(month) {
        articles = articles.filter(({ date }) => {
          const articleMonth = moment(date, 'YYYY-MM-DD');
          return month === articleMonth.format('MMMYY');
        });
      }

      if(tags) {
        articles = articles.filter(({ tag }) => {
          // let isValid = true;
          let isValid = false;

          tags.forEach(item => {
            // isValid = isValid && tag.split(',').includes(item);
            isValid = isValid || tag.split(',').includes(item);
          });

          return isValid;
        });
      }

      if(get(this, 'isMore')) set(this, 'isMore', false);
      else set(this, 'counter', 1);

      set(this, 'length', articles.length);

      return articles.filter((item, index) => index < size);
    }
  }),

  size: computed('increment', 'counter', {
    get() {
      const inc = get(this, 'increment');
      const counter = get(this, 'counter');
      return inc * counter;
    }
  }),

  isEnd: computed('length', 'size', {
    get() {
      const length = get(this, 'length');
      const size = get(this, 'size');
      return length <= size;
    }
  }),

  actions: {

    clear() {
      set(this, 'month', null);
      set(this, 'tags', null);
    },

    more() {
      const counter = get(this, 'counter')*1 + 1;
      set(this, 'counter', counter);
      set(this, 'isMore', true);
    }
  }
});
