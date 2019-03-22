import Route from '@ember/routing/route';
import Ember from 'ember';

export default Route.extend({
    // model(){
    //     return this.get('store').findAll('article');
    // }
    model(){
        return Ember.RSVP.hash({
            articles: this.get('store').findAll('article'), 
            thoughts: this.get('store').findAll('thought')
        });
    }
});
