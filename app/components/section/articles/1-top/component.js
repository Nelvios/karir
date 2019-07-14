import Component from '@ember/component';
import { set } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',
  showModel: null,
  filtered: null,
  // isLoading:true,
  counter: 0,

  didInsertElement(){
    this._super(...arguments);
    const model = this.get('model');
    const filter = model.filter((item, idx) => idx < 6);
    set(this, 'showModel', filter.get('firstObject'));
    set(this, 'filtered', filter);

    // store.findAll('article').then(result => {
    //   let filter = result.filter((item, idx) => idx < 6);
    //   set(this, 'isLoading', false);
    //   set(this, 'model', result);
    //   set(this, 'showModel', filter.get('firstObject'));
    //   set(this, 'filtered', filter)
    // });
  },

  actions: {
    moveToPrev(){
      const filtered = this.get('filtered');
      let counter = this.get('counter');
      this.$('#indicator-'+counter.toString()).removeClass("active");
      counter -= 1;
      if(counter < 0){
        counter = 5
      }
      this.$('#indicator-'+counter.toString()).addClass("active");
      this.set('showModel', filtered.objectAt(counter));
      this.set('counter', counter);
    },
    moveToNext(){
      const filtered = this.get('filtered');
      let counter = this.get('counter');
      this.$('#indicator-'+counter.toString()).removeClass("active");
      // console.log(indicatorNow);
      counter += 1;
      if(counter > 5){
        counter = 0
      }
      this.$('#indicator-'+counter.toString()).addClass("active");
      this.set('showModel', filtered.objectAt(counter));
      this.set('counter', counter);
    }
  }

});
