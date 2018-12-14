import Route from '@ember/routing/route';
import Controller from '@ember/controller';
import LinkComponent from '@ember/routing/link-component';
import { ROOT } from 'karir/utils/properties';

export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');

  Route.reopen({
    // insert code applied to all routes
  });

  LinkComponent.reopen({

    attributeBindings: ['data-toggle'],

    didReceiveAttrs() {
      const params = this.get('params');
      params[0] = `${ROOT}.${params[0]}`;

      this._super(...arguments);
    }

  });
}

export default {
  initialize,
  name: 'route'
};
