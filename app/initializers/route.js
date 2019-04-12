import Route from '@ember/routing/route';
import Controller from '@ember/controller';
import LinkComponent from '@ember/routing/link-component';
import { ROUTE_PREFIX } from 'karir/utils/properties';
import { jQ } from 'karir/utils/short';

export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');

  Route.reopen({
    // insert code applied to all routes

    transitionTo(route, ...args) {
      this._super(`${ROUTE_PREFIX}.${route}`, ...args);
    },

    render(route, options, ...args) {
      if(arguments.length === 0) this._super();
      else {
        route = `${ROUTE_PREFIX}.${route}`;
        switch(options.into) {
          case undefined: break;
          case 'application': break;
          default:
            options.into = `${ROUTE_PREFIX}.${options.into}`; break;
        }

        this._super(route, options, ...args);
      }
    },

    actions: {

      didTransition() {
        this._super(...arguments);
        jQ(window).scrollTop(0);
      }
    }

  });

  LinkComponent.reopen({

    attributeBindings: ['data-toggle'],

    didReceiveAttrs() {
      const params = this.get('params');
      params[0] = `${ROUTE_PREFIX}.${params[0]}`;

      this._super(...arguments);
    }

  });

  Controller.reopen({
    // insert code applied to all controllers

    transitionToRoute(route, ...args) {
      this._super(`${ROUTE_PREFIX}.${route}`, ...args);
    }
  })
}

export default {
  initialize,
  name: 'route',
  before: 'store'
};
