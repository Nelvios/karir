import Controller from '@ember/controller';
import { get, set, computed } from 'karir/utils/short';

export default Controller.extend({

  queryParams: ['specialization', 'location'],
  specialization: null,
  location: null,

  length: 0,
  increment: 6,
  counter: 1,

  jobs: computed('specialization', 'location', 'size', {
    get() {
      const spec = get(this, 'specialization');
      const loc = get(this, 'location');
      const size = get(this, 'size');
      let jobs = get(this, 'model');

      if(spec) jobs = jobs.filterBy('specialization', spec);
      if(loc) jobs = jobs.filter(({ location }) => location.includes(loc));

      if(get(this, 'isMore')) set(this, 'isMore', false);
      else set(this, 'counter', 1);

      set(this, 'length', jobs.length);
      return jobs.filter((item, index) => index < size);
    }
  }),

  size: computed('increment', 'counter', {
    get() {
      const inc = get(this, 'increment');
      const counter = get(this, 'counter');
      return inc * counter;
    }
  }),

  isEnd: computed('length', 'size', {
    get() {
      const length = get(this, 'length');
      const size = get(this, 'size');
      return length <= size;
    }
  }),

  actions: {

    clear() {
      set(this, 'specialization', null);
      set(this, 'location', null);
    },

    more() {
      const counter = get(this, 'counter')*1 + 1;
      set(this, 'counter', counter);
      set(this, 'isMore', true);
    }
  }

});
