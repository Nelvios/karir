import Component from '@ember/component';
import { jQ, get, set } from 'karir/utils/short';

export default Component.extend({

  tagName: 'nav',
  isSidenav: false,

  didInsertElement() {
    this._super(...arguments);
    const THRESHOLD = 16;
    const body = jQ('body');
    console.log(jQ(window).scroll());

    jQ(window).scroll(() => {

      if(jQ(window).scrollTop() > THRESHOLD) {
        body.removeClass('navbar-top');
      } else {
        body.addClass('navbar-top');
      }

    });
    jQ(window).scroll();

    this.$('.sidenav').sidenav({
      edge: 'right',
      onOpenStart:  () => set(this, 'isSidenav', true),
      onCloseStart: () => set(this, 'isSidenav', false)
    });
  },

  actions: {

    sidenav() {
      const sidenav = this.$('.sidenav');
      const isOpen = get(this, 'isSidenav');

      if(isOpen) sidenav.sidenav('close');
      else sidenav.sidenav('open');
    }
  }

});
