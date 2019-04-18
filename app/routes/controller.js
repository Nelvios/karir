import Controller from '@ember/controller';
import { jQ, set } from 'karir/utils/short';

export default Controller.extend({

  size: null,

  actions: {

    load() {
      const small = 600;
      const medium = 992;
      const large = 1200;

      // run after page load
      jQ(window).resize(() => {
        const width = jQ(window).outerWidth();
        set(this, 'size', width <= small ? 's' : width <= medium ? 'm' : width <= large ? 'l' : 'xl');
      });

      jQ(window).resize();
    }
  }

});
