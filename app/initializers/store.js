import DS from 'ember-data';
import { MODEL_PREFIX } from 'karir/utils/properties';

export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');

  DS.Store.reopen({

    findAll()       { return this._super(...this._addPrefix(...arguments)); },
    findRecord()    { return this._super(...this._addPrefix(...arguments)); },

    _addPrefix(name, ...args) {
      const pattern = new RegExp(`^${MODEL_PREFIX}\\/`);
      if (!name.match(pattern)) name = `${MODEL_PREFIX}/${name}`;
      return [name, ...args];
    }

  });
}

export default {
  initialize,
  name: 'store',
  before: 'model'
};
