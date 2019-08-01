import Component from '@ember/component';
import { jQ, get, set, computed } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',
  // showArticle: null,
  tableOfContents: null,
  tags: null,

  didInsertElement(){
    this._super(...arguments);
    this.$('#toc').addClass('none');
    const model = this.get('model');
    const arraysTOC = [];
    const arraysTag = [];

    const filter = model.filter((result) => {
      const tag = result.get('tag');
      const getDate = result.get('date');
      const dateFormatted = new Date(getDate);
      const month = dateFormatted.toLocaleString('en-us', { month: 'long' });
      const year = dateFormatted.getUTCFullYear();
      const toc = month+" "+year;
      if(!arraysTOC.includes(toc)){
        arraysTOC.push(toc);
      }
      if(!arraysTag.includes(tag)){
        arraysTag.push(tag);
      }
    });

    set(this, 'tableOfContents', arraysTOC);
    set(this, 'tags', arraysTag);
    // set(this, 'showArticle', model);
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
    const container = this.$('.container');
    const footer = jQ('#footer');

    return {
      top:    container.offset().top - 200,
      bottom: footer.offset().top - jQ(window).height() + 200,
      topPlus: container.offset().top - 300,
      bottomPlus: footer.offset().top - jQ(window).height() + 300
    };
  },

  actions: {
    tocPicked(index,month){
      const a = this.$('li > a');
      if(a.eq(index).attr('class') == "active"){
        a.eq(index).removeClass('active');
        this.clearMonth();
      }
      else{
        a.removeClass('active');
        a.eq(index).addClass('active');
      }
      set(this, 'month', month);
      console.log(get(this, 'month'));
    },
    tagPicked(index, pickedTag){
      const a = this.$('div > a');
      if(a.eq(index).find('i').length){
        a.eq(index).children().remove();
        a.eq(index).removeAttr("style");
        this.clearPickedTags();
      }
      else{
        a.children().remove();
        a.removeAttr("style");
        a.eq(index).append(' <i class="material-icons icon-right">check</i>');
        a.eq(index).css("width", "100px");
      }
      set(this, 'pickedTags', pickedTag);
      console.log(get(this, 'pickedTags'));
    }
  }

});
