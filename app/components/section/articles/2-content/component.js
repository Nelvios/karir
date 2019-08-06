import Component from '@ember/component';
import { jQ, get, set, computed } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',

  model: null,
  articles: null,
  month: null,
  tags: null,

  // monthList: [
  //   '2019-07-01',
  //   '2019-05-01',
  //   '2019-04-01'
  // ],

  monthList: computed('articles', {
    get() {
      const articles = get(this, 'model');
      const months = [];

      articles.forEach(({ date }) => {
        date = `${date.substr(0, 7)}-01`;
        if(!months.includes(date)) months.pushObject(date);
      });

      return months;
    }
  }),

  // tagList: [
  //   'testing',
  //   'try',
  //   'coba'
  // ],

  tagList: computed('articles', 'tags', {
    get() {
      const articles = get(this, 'model');
      const activeTags = get(this, 'tags') ? get(this, 'tags').split(',') : [];
      const tags = [];

      articles.forEach(({ tag }) => {
        if(tag) {
          tag.split(',').forEach(item => {
            item = item.trim();
            if(!tags.includes(item)) tags.pushObject(item);
          });
        }
      });

      tags.sort();
      return tags.map(tag => {
        return { name: tag, isActive: activeTags.includes(tag) };
      });
    }
  }),

  didRender(){
    this._super(...arguments);

    jQ(window).off('scroll.month-list');
    jQ(window).on('scroll.month-list', () => {
      const threshold = this._getThreshold() || {};
      const scroll = jQ(window).scrollTop();
      const list = this.$('ul#month-list');

      if(scroll > threshold.top) list.removeClass('top');
      else list.addClass('top');

      if(scroll > threshold.bottom) list.addClass('bottom');
      else list.removeClass('bottom');
    });
  },

  willDestroyElement(){
    this._super(...arguments);

    jQ(window).off('scroll.month-list');
  },

  _getThreshold() {
    const tags = this.$('.tags');
    const footer = jQ('#footer');
    const list = this.$('ul#month-list');

    return {
      top:    tags.offset().top - 101,
      bottom: footer.offset().top - list.outerHeight() - 130
    };
  },

  actions: {

    tagToggle(tag) {
      let tags = get(this, 'tags') ? get(this, 'tags').split(',') : [];

      if(tags.includes(tag)) tags = tags.filter(item => tag !== item);
      else tags.pushObject(tag);

      tags.sort();
      set(this, 'tags', tags.length > 0 ? tags.join(',') : null);
    }
  }

});
