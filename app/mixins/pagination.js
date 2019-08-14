import Mixin from '@ember/object/mixin';
import { get, set, computed } from 'karir/utils/short';

export default Mixin.create({

  total: 0,   // Override this with a computed property of the list used
  page: 1,
  pageSize: 6,

  size: computed('page', 'pageSize', {
    get() {
      return get(this, 'page') * get(this, 'pageSize');
    }
  }),

  isMore: computed('total', 'size', {
    get() {
      return get(this, 'total') > get(this, 'size');
    }
  }),

  actions: {

    more() {
      const page = get(this, 'page')*1;
      set(this, 'page', page + 1);
    }
  }

});
