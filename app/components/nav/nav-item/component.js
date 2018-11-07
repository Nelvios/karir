import LinkComponent from '@ember/routing/link-component';
import { get, computed } from 'karir/utils/short';

export default LinkComponent.extend({

  tagName: 'li',
  classNames: ['nav-item'],

  address: computed('targetRouteName', {
    get() {
      let href = get(this, 'targetRouteName').split('.');

      if (href.length > 0 && href[href.length-1] === 'index') href.popObject();
      href.shift();

      return `/${href.join('/')}`;
    }
  })

});
