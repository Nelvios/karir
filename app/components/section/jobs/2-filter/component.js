import Component from '@ember/component';
import { jQ, set } from 'karir/utils/short'

export default Component.extend({

  tagName: 'section',
  // specialization: null,
  // location: null,
  // data: null,
  // store: service(),

  // didInsertElement(){
  //   this._super(...arguments);

  //   this.$('select').formSelect();
  // },

  actions: {

    clear() {
      set(this, 'specialization', null);
      set(this, 'location', null);
    }

    // selectSpecialization(specializationRet) {
    //   // this.set('specialization',specializationRet);
    //   this.get('passData')(specializationRet);
    // },

    // selectLocation(locationRet) {
    //   this.get('passData')(locationRet);
    // },

    // selectSpecialization: function(specializationRet){
    //   this.set('specialization',specializationRet);
    //   let data;
    //   const model = this.get('model')
    //   const locationSelected = this.get('location');
    //   const specializationSelected =  model.filterBy('specialization', specializationRet);
    //   if(locationSelected){
    //     const filteredDataSpec = specializationSelected.filter(function(item){
    //       return item.location.includes(locationSelected)
    //     });
    //     if(filteredDataSpec.length == 0){
    //       this.set('data','empty');
    //     }
    //     else{
    //       this.set('data', filteredDataSpec);
    //     }
    //   }
    //   else{
    //     if(specializationSelected == 0){
    //       this.set('data','empty');
    //     }
    //     else{
    //       this.set('data', specializationSelected);
    //     }
    //   }
    //   data = this.get('data')
    //   this.get('passData')(data);
    // },
    // selectLocation: function(locationRet){
    //   this.set('location', locationRet);
    //   let data;
    //   const model = this.get('model')
    //   const specializationSelected = this.get('specialization');
    //   const locationSelected = model.filter(function(item){
    //     return item.location.includes(locationRet)
    //   });
    //   if(specializationSelected){
    //     const filteredDataLoc = locationSelected.filterBy('specialization', specializationSelected);
    //     if(filteredDataLoc.length == 0){
    //       this.set('data','empty');
    //     }
    //     else{
    //       this.set('data', filteredDataLoc);
    //     }
    //   }
    //   else{
    //     if(locationSelected == 0){
    //       this.set('data','empty');
    //     }
    //     else{
    //       this.set('data', locationSelected);
    //     }
    //   }
    //   data = this.get('data')
    //   this.get('passData')(data);
    // }
  }
});
