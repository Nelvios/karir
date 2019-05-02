import Controller from '@ember/controller';
import { get, computed } from 'karir/utils/short';

export default Controller.extend({

  specialization: null,
  location: null,

  jobs: computed('specialization', 'location', {
    get() {
      const spec = get(this, 'specialization');
      const loc = get(this, 'location');
      let jobs = get(this, 'model');

      if(spec) jobs = jobs.filterBy('specialization', spec);
      if(loc) jobs = jobs.filter(({ location }) => location.includes(loc));

      return jobs;
    }
  })

  // actions:{

  //   handleData(data){
  //     const model = this.get('model');
  //     let tempData;

  //     if(data == "programmer" || data == "network" || data == "data" || data == "infrastructure"){
  //       this.set('specialization', data);
  //     }
  //     else if(data == "jabodetabek" || data == "surabaya" || data == "yogyakarta"){
  //       this.set('location',data);
  //     }

  //     const specializationData = this.get('specialization');
  //     const locationData = this.get('location');

  //     if(specializationData){
  //       tempData = null;
  //       tempData = model.filterBy('specialization', specializationData);
  //     }
  //     else if(locationData){
  //       tempData = null;
  //       tempData = model.filter(function(item){
  //             return item.location.includes(locationData);
  //           });
  //     }

  //     if(specializationData && locationData){
  //       tempData = null;
  //       tempData = model.filterBy('specialization', specializationData);
  //       tempData = tempData.filter(function(item){
  //         return item.location.includes(locationData);
  //       });
  //     }

  //     if(tempData.length == 0){
  //       this.set('result', null);
  //       this.set('empty',"Data Not Found!");
  //     }
  //     else{
  //       this.set('empty', null);
  //       this.set('result', tempData);
  //     }
  //   }
  // }

});
