import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
  sortingData: ['id:desc'],
  sortedArticle: Ember.computed.sort('model.articles', 'sortingData'),
  sliceArticle: Ember.computed.filter('sortedArticle', function(data, index){
    return (index < 3);
  }),
  randLoading:function(){
    let test = [];
    let Data = [];
    let thoughtData = this.model.thoughts;
    let getID = thoughtData.map(function(item, index, enumerable){
      return Data.push(item.get('id'));
    });
    for(let i=0; i<3 ; i++){
      let randomization = (Math.floor(Math.random() * thoughtData.length));
      test.push(randomization);
    }
    console.log(test);
    console.log(Data);
  }.property().volatile()
});
