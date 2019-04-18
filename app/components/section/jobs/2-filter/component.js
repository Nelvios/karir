import Component from '@ember/component';

export default Component.extend({

  tagName: 'section',
  specialization: null,
  location: null,

  didInsertElement(){
    this._super(...arguments);

    this.$('select').formSelect();
  },

  actions: {
    selectSpecialization: function(specialization){
      const specializationSelected =  this.get('model').filterBy('specialization', specialization);
      console.log(specializationSelected);
    },
    selectLocation: function(location){
      const locationSelected = this.get('model').filter(function(item, index, enumerable){
        return item.location == location
        // console.log(item.location == location);
      });
      console.log(locationSelected);
    }
  }
});
