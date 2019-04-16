import Controller from '@ember/controller';
import { jQ, get, set } from 'karir/utils/short';

export default Controller.extend({

  actions: {

    load() {
      // run after page load
      jQ(window).resize(() => {
        // alert('in');
      });

      jQ(window).resize();

      alert('load');
    }
  }

});
