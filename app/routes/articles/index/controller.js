import Controller from '@ember/controller';
import { get, computed } from 'karir/utils/short';

export default Controller.extend({

  queryParams:['month', 'pickedTags'],
  month: null,
  pickedTags: null,

  articles: computed('month', 'pickedTags', {
    get() {
      const month = get(this, 'month');
      const tag = get(this, 'pickedTags');
      let articles = this.get('model');

      if(month){
        articles = articles.filter((result) => {
          const getDate = result.get('date');
          const dateFormatted = new Date(getDate);
          const dateFormattedData = new Date(month);
          const monthModel = dateFormatted.toLocaleString('en-us', { month: 'long' });
          const monthData = dateFormattedData.toLocaleString('en-us', { month: 'long' });
          if (monthData == monthModel){
            return result
          }
        })
      }

      if(tag){
        articles = articles.filter((result) => {
          const getTag = result.get('tag');
          if(tag == getTag){
            return result;
          }
        })
      }

      return articles;
    }
  }),
});
