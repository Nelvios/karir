import Controller from '@ember/controller';
import { jQ } from 'karir/utils/short';

export default Controller.extend({

  actions: {

    button() {
      // var $this = $(this);
      // var $target = $('#' + $(this).attr('data-target'));

      jQ('.btn.pulse').pushpin({
        // top: $target.offset().top,
        // bottom: $target.offset().top + $target.outerHeight() - $this.height()
        top: 100,
        bottom: 500,
        offset: 120
      });
    }
  }

});
