import Component from '@ember/component';
import { set, service } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',
  store: service(),

  model: null,
  isLoading: true,
  showModel: null,
  counter: 0,

  didInsertElement() {
    this._super(...arguments);
    const store = this.get('store');
    // const slider = this.$('.slider');

    store.findAll('thought').then(result => {
      set(this, 'isLoading', false);
      set(this, 'model', result);
      set(this, 'showModel', result.get('firstObject'));
    });
  },

  didUpdate() {
    this._super(...arguments);
    this.$('.tooltip').tooltip();
  },

  willDestroyElement() {
    this._super(...arguments);
    this.$('.tooltip').tooltip('destroy');
  },

  actions: {
    moveToPrev(){
      const model = this.get('model');
      let counter = this.get('counter');
      counter -= 1;
      if(counter < 0){
        counter = 3;
      }
      this.set('showModel', model.objectAt(counter));
      // this.$('.content').animate({opacity: 1}, 1000);
      this.set('counter', counter);
      // else{
      //   this.set('showModel', model.objectAt(counter));
      //   this.set('counter', counter);
      // }
      // this.set('showModel', model.objectAt(1));
      // console.log(model.objectAt(1));
      // const first = model.get('firstObject');
      // console.log(first.get('id'));
      // this.$('.slider').slider('prev');
      // this.$('.slider').slider('pause');
    },
    moveToNext(){
      const model = this.get('model');
      let counter = this.get('counter');
      counter += 1;
      if(counter > 3){
        counter = 0;
      }
      this.set('showModel', model.objectAt(counter));
      this.set('counter', counter);
      // this.$('.slider').slider('next');
      // this.$('.slider').slider('pause');
    }
  }

});
