import Controller from '@ember/controller';

export default Controller.extend({

  result:null,
  empty:null,

  actions:{

    handleData(data){
      if(data == "empty"){
        this.set('result', null);
        this.set('empty',"Data Not Found!");
      }
      else{
        this.set('empty', null);
        this.set('result', data);
      }
    }
  }

});
