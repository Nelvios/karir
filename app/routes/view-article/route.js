import Route from '@ember/routing/route';

export default Route.extend({
    model(params){
        // return this.store.findRecord('job', params.id);
        return this.get('store').findRecord('article', params.id)
    }
});
