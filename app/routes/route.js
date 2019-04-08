import Route from '@ember/routing/route';

export default Route.extend({
    model(){
        // return this.get('store').findAll('job').then(job => job.filter(job => get(job, 'featured') === true));
        // return this.get('store').findAll('job');
        return this.get('store').findAll('job').then(function(result) {
            return result.filterBy("featured", true);
        });
    }
});
