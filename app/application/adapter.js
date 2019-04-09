import DS from 'ember-data';
import host from 'karir/utils/host';
import { MODEL_PREFIX } from 'karir/utils/properties';

export default DS.RESTAdapter.extend({

  urlForFindAll(modelName) {
    return host(`${this._removePrefix(modelName)}.search`);
  },

  urlForFindRecord(id, modelName) {
    return host(`${this._removePrefix(modelName)}.find`).replace(/:id/, id);
  },

  _removePrefix(name) {
    return name.replace(`${MODEL_PREFIX}/`, '').replace(/\//g, '.');
  }

});
