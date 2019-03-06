import DS from 'ember-data';
import { MODEL_PREFIX } from 'karir/utils/properties';

export function initialize(/* application */) {
  // application.inject('route', 'foo', 'service:foo');

  DS.Store.reopen({

    findAll()       { return this._super(...this._addPrefix(...arguments)); },
    findRecord()    { return this._super(...this._addPrefix(...arguments)); },
    query()         { return this._super(...this._addPrefix(...arguments)); },
    queryRecord()   { return this._super(...this._addPrefix(...arguments)); },
    createRecord()  { return this._super(...this._addPrefix(...arguments)); },
    updateRecord()  { return this._super(...this._addPrefix(...arguments)); },
    deleteRecord()  { return this._super(...this._addPrefix(...arguments)); },

    peekAll() {
      return this._super(...this._addPrefix(...arguments)) || this.findAll(...arguments);
    },
    peekRecord() {
      return this._super(...this._addPrefix(...arguments)) || this.findRecord(...arguments);
    },

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
