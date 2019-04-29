import Controller from '@ember/controller';

export default Controller.extend({

  result:null,
  empty:null,
  specialization:null,
  location:null,

  actions:{

    handleData(data){
      const model = this.get('model');
      let tempData;

      if(data == "programmer" || data == "network" || data == "data" || data == "infrastructure"){
        this.set('specialization', data);
      }
      else if(data == "jabodetabek" || data == "surabaya" || data == "yogyakarta"){
        this.set('location',data);
      }

      const specializationData = this.get('specialization');
      const locationData = this.get('location');

      if(specializationData){
        tempData = null;
        tempData = model.filterBy('specialization', specializationData);
      }
      else if(locationData){
        tempData = null;
        tempData = model.filter(function(item){
              return item.location.includes(locationData);
            });
      }

      if(specializationData && locationData){
        tempData = null;
        tempData = model.filterBy('specialization', specializationData);
        tempData = tempData.filter(function(item){
          return item.location.includes(locationData);
        });
      }

      if(tempData.length == 0){
        this.set('result', null);
        this.set('empty',"Data Not Found!");
      }
      else{
        this.set('empty', null);
        this.set('result', tempData);
      }
    }
  }

});
