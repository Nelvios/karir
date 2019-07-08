import Component from '@ember/component';
import { jQ, get, set, service } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',
  store: service(),

  model:null,
  showArticle: null,
  tableOfContents: [],

  // init(){

  //   this._super(...arguments);
  //   const arrays = [];

  //   this.store.findAll('article').then(results => {
  //     const filter = results.filter((result) => {
  //       const getDate = result.get('date');
  //       const dateFormatted = new Date(getDate);
  //       const month = dateFormatted.toLocaleString('en-us', { month: 'long' });
  //       const year = dateFormatted.getUTCFullYear()
  //       const toc = month+" "+year
  //       if(!arrays.includes(toc)){
  //         arrays.push(toc);
  //       }
  //     });
  //     set(this, 'tableOfContents', arrays);
  //     set(this, 'model', results);
  //     set(this, 'showArticle', results);
  //   });
  // },

  didInsertElement(){
    this._super(...arguments);
    // this.$('#toc').hide();
    const store = get(this, 'store');
    const arrays = [];

    store.findAll('article').then(results => {
      const filter = results.filter((result) => {
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
      set(this, 'model', results);
      set(this, 'showArticle', results);
    });

    // jQ(window).on('scroll.animate', () => {
    //   const threshold = this._getThreshold() || {};
    //   const scroll = jQ(window).scrollTop();
    //   const toc = this.$('#toc');
    //   console.log(scroll);

    //   if(scroll > threshold.top && scroll < threshold.bottom) {
    //     toc.stop(true).fadeIn(300);
    //   } else {
    //     toc.stop(true).fadeOut(300);
    //   }

      // if(scroll > threshold.bottom) {
      //   toc.stop(true).fadeOut();
      // } else {
      //   toc.stop(true).fadeIn();
      // }
    // });


    // const containerTop = $('#containerContent').offset().top;
    // const footerTop = $('#containerFooter').offset().top;
    // console.log($('#containerContent').offset().top);
    // console.log($('#containerFooter').offset().top);
    // jQ(window).scroll(() =>{
    //   console.log(jQ(window).scrollTop());
    //   console.log(jQ(window).height());
    //   console.log(jQ(window).scrollTop() + jQ(window).height())
    //   console.log($('#containerContent').offset().top);
    //   console.log($('#containerFooter').offset().top);
    //   console.log("===========")
    // });
  },

  didRender(){
    this._super(...arguments);
    jQ(window).on('scroll.animate', () => {
      const threshold = this._getThreshold() || {};
      const scroll = jQ(window).scrollTop();
      const toc = this.$('#toc');
      console.log(scroll);

      if(scroll > threshold.top && scroll < threshold.bottom) {
        toc.removeClass('invisible')
      }
      else {
        toc.addClass('invisible')
      } 


      if(scroll < threshold.topPlus || scroll > threshold.bottomPlus){
        console.log("masuk sini")
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

  _getThreshold() {
    const container = jQ('#containerContent');
    const footer = jQ('#footer');
    // const btn = this.$('.btn.apply');
    console.log({
      top:    container.offset().top - 200,
      bottom: footer.offset().top - jQ(window).height() + 200,
      topPlus: container.offset().top - 300,
      bottomPlus: footer.offset().top - jQ(window).height() + 300
    })

    return {
      top:    container.offset().top - 200,
      bottom: footer.offset().top - jQ(window).height() + 200,
      topPlus: container.offset().top - 350,
      bottomPlus: footer.offset().top - jQ(window).height() + 350
    };
  },

  // didRender(){
  //   this._super(...arguments);
  //   const containerTop = $('#containerContent').offset().top;
  //   const footerTop = $('#containerFooter').offset().top;
  //   const bottom = 2921;
  //   // console.log($('#containerContent').offset().top);
  //   // console.log($('#containerFooter').offset().top);
  //   // console.log(bottom)

  //   jQ(window).scroll(() =>{
  //     // console.log(jQ(window).scrollTop());
  //     // console.log(jQ(window).height());
  //     // console.log(jQ(window).scrollTop() + jQ(window).height())
  //     // console.log($('#containerContent').offset().top);
  //     // console.log($('#containerFooter').offset().top);
  //     // console.log("===========")
  //     if(jQ(window).scrollTop() > containerTop && jQ(window).scrollTop() + jQ(window).height() < footerTop){
  //       console.log("masuk")
  //       console.log("===========")
  //       this.$('#toc').fadeIn();
  //     }
  //     else if(jQ(window).scrollTop() < containerTop){
  //       console.log("keluar")
  //       console.log("===========")
  //       this.$('#toc').fadeOut();
  //     }
  //     else if (jQ(window).scrollTop() + jQ(window).height() > bottom){
  //       console.log("keluar")
  //       console.log("===========")
  //       this.$('#toc').fadeOut();
  //     }
  //     // else{
  //     //   console.log("keluar")
  //     //   console.log("===========")
  //     // }
  //     // if(jQ(window).scrollTop() + jQ(window).height() > footerTop){
  //     //   console.log("keluar")
  //     //   console.log("===========")
  //     // }
  //     // if(jQ(window).scrollTop() + jQ(window).height() < footerTop){
  //     //   console.log("masuk");
  //     // }
  //     // else{
  //     //   console.log("keluar")
  //     //   console.log("===========")
  //     //   // this.$('#toc').fadeOut();
  //     // }
  //   });
  // },

  actions: {
    tocPicked(tableOfContent){
      console.log(tableOfContent);
      const filteredArray = [];
      const model = this.get('model');
      const filtered = model.filter((result) => {
        const getDate = result.get('date');
        const dateFormatted = new Date(getDate);
        const dateFormattedData = new Date(tableOfContent);
        const month = dateFormatted.toLocaleString('en-us', { month: 'long' });
        const monthData = dateFormattedData.toLocaleString('en-us', { month: 'long' });
        // const dateTest = new Date(tableOfContent);
        console.log(month);
        if(monthData == month){
          console.log("masuk sini")
          filteredArray.push(result)
        }
        // console.log(dateTest);
      })
      set(this, 'showArticle', filteredArray);
      console.log(filteredArray);
    }
  }

});
