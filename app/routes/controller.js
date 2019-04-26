import Controller from '@ember/controller';
import { jQ } from 'karir/utils/short';

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
        const size = width <= small ? 'sm' : width <= medium ? 'md' : width <= large ? 'lg' : 'xl';

        jQ('body').attr('data-size', size);
      });

      jQ(window).resize();
    }
  }

});
