import Controller from '@ember/controller';
import { get, set, computed, isEmpty } from 'karir/utils/short';

export default Controller.extend({

  queryParams: ['specialization', 'location'],
  specialization: null,
  location: null,

  jobs: computed('model.[]', 'specialization', 'location', {
    get() {
      const spec = get(this, 'specialization');
      const loc = get(this, 'location');
      let jobs = get(this, 'model');

      if(spec) jobs = jobs.filter(job => job.isSpecialization(spec));
      if(loc) jobs = jobs.filter(job => job.isLocation(loc));

      return jobs;
    }
  }),

  actions: {

    clear() {
      set(this, 'specialization', null);
      set(this, 'location', null);
    }
  }

});
