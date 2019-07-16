import Component from '@ember/component';
import { jQ, get, set, computed } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',
  showArticle: null,
  tableOfContents: null,

  didInsertElement(){
    this._super(...arguments);
    this.$('#toc').addClass('none');
    const model = this.get('model');
    const arrays = [];

    const filter = model.filter((result) => {
      const getDate = result.get('date');
      const dateFormatted = new Date(getDate);
      const month = dateFormatted.toLocaleString('en-us', { month: 'long' });
      const year = dateFormatted.getUTCFullYear()
      const toc = month+" "+year
      if(!arrays.includes(toc)){
        arrays.push(toc);
      }
    });

    set(this, 'tableOfContents', arrays);
    set(this, 'showArticle', model);
  },

  didRender(){
    this._super(...arguments);
    jQ(window).on('scroll.animate', () => {
      const threshold = this._getThreshold() || {};
      const scroll = jQ(window).scrollTop();
      const toc = this.$('#toc');

      if(scroll > threshold.top && scroll < threshold.bottom) {
        toc.removeClass('invisible')
      }
      else {
        toc.addClass('invisible')
      }


      if(scroll < threshold.topPlus || scroll > threshold.bottomPlus){
        toc.addClass('none')
      }
      else{
        toc.removeClass('none')
      }
    });
  },

  didUpdate(){
    this._super(...arguments);

    jQ(window).off('scroll.animate');
    jQ(window).triggerHandler('scroll.animate');
  },

  willDestroyElement(){
    this._super(...arguments);

    jQ(window).off('scroll.animate');
  },

  _getThreshold() {
    const container = jQ('#containerContent');
    const footer = jQ('#footer');

    return {
      top:    container.offset().top - 200,
      bottom: footer.offset().top - jQ(window).height() + 200,
      topPlus: container.offset().top - 300,
      bottomPlus: footer.offset().top - jQ(window).height() + 300
    };
  },

  articles: computed('month', {
    get() {
      const month = get(this, 'month');
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

      return articles;
    }
  }),

  actions: {
    tocPicked(month){
      set(this, 'month', month);
      console.log(get(this, 'month'));
    }
  }

});
