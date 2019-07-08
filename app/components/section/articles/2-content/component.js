import Component from '@ember/component';
import { jQ, get, set, service } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',
  store: service(),

  model:null,
  tableOfContents: [],

  didInsertElement(){
    this._super(...arguments);
    const arrays = [];
    this.$('#toc').hide(); 
    const containerTop = $('#containerContent').offset().top;
    const footerTop = $('#containerFooter').offset().top;


    jQ(window).scroll(() =>{
      if(jQ(window).scrollTop() > containerTop && jQ(window).scrollTop() + jQ(window).height() < footerTop){
       this.$('#toc').fadeIn();
      }
      else if(jQ(window).scrollTop() + jQ(window).height() > footerTop){
        this.$('#toc').fadeOut();
      }
      else {
        this.$('#toc').fadeOut();     
      }
    });

    this.store.findAll('article').then(results => results.filter((result) => {
      const getDate = result.get('date');
      const dateFormatted = new Date(getDate);
      const month = dateFormatted.toLocaleString('en-us', { month: 'long' });
      const year = dateFormatted.getUTCFullYear()
      const toc = month+" "+year
      // console.log(month+" "+year);
      if(!arrays.includes(toc)){
        arrays.push(toc);
      }
      })
    );
    this.set('tableOfContents', arrays);
  }

});
