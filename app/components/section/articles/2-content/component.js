import Component from '@ember/component';
import { jQ, get, set } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',

  didInsertElement(){
    this._super(...arguments);

    // const y = $(document).scrollTop();
    // const t = $('#rows').parent().offset().top;
    // console.log(y);
    // console.log(t);

    jQ('#toc').each(function(){
      const y = $(document).scrollTop();
      const t = $('#rows').parent().offset().top;
      if (y > t){
        console.log("masuk sini")
        $(this).fadeIn();
      }
      else{
        $(this).fadeOut();
      }
    });
    // this.$('#toc').each(function(){
    //   const y = $(document).scrollTop();
    //   const t = $('#rows').parent().offset().top;
    //   if (y > t){
    //     console.log("masuk sini")
    //     $(this).fadeIn();
    //   }
    //   else{
    //     $(this).fadeOut();
    //   }
    // });
  }

  // actions:{
  //   selectedUser(){

  //   }
  // }

});
