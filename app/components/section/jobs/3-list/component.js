import Component from '@ember/component';
import Pagination from 'karir/mixins/pagination';
import { get, computed, alias } from 'karir/utils/short';

export default Component.extend(Pagination, {

  tagName: 'section',

  total:alias('jobs.length'),
  showJobs: computed('jobs.[]', 'size', {
    get() {
      const jobs = get(this, 'jobs') || [];
      const size = get(this, 'size');

      return jobs.filter((item, idx) => idx < size);
    }
  })

});
