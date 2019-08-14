import Route from '@ember/routing/route';
import { jQ, run } from 'karir/utils/short';

export default Route.extend({

  actions: {

    didTransition() {
      run.later(() => jQ('html').animate({ scrollTop: 0 }, 300), 500);
    }
  }
});
