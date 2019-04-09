import Route from '@ember/routing/route';
import Ember from 'ember';
import { sort } from '@ember/object/computed';
import { filter } from 'rsvp';

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
