import Controller from '@ember/controller';
import { get, set, computed, moment } from 'karir/utils/short';

export default Controller.extend({

  queryParams:['month', 'tags'],
  month: null,
  tags: null,

  articles: computed('model.[]', 'month', 'tags.[]', {
    get() {
      const month = get(this, 'month');
      const tags = get(this, 'tags') ? get(this, 'tags').split(',') : null;
      let articles = get(this, 'model').sortBy('date', 'id').reverseObjects();

      if(month) {
        articles = articles.filter(({ date }) => {
          const articleMonth = moment(date, 'YYYY-MM-DD');
          return month === articleMonth.format('MMMYY');
        });
      }

      if(tags) {
        articles = articles.filter(article => article.isTags(...tags));
      }

      return articles;
    }
  }),

  actions: {

    clear() {
      set(this, 'month', null);
      set(this, 'tags', null);
    }
  }
});
