import DS from 'ember-data';
// import FirebaseAdapter from 'emberfire/adapters/firebase';
import host from 'karir/utils/host';
import { ENVIRONMENT, REQUEST_TIMEOUT, MODEL_PREFIX } from 'karir/utils/properties';
import { log } from 'karir/utils/short';

export default DS.RESTAdapter.extend({

  urlForFindAll(modelName) {
    return host(`${this._removePrefix(modelName)}.search`);
  },

  urlForFindRecord(id, modelName) {
    return host(`${this._removePrefix(modelName)}.find`).replace(/:id/, id);
  },

  _removePrefix(name) {
    return name.replace(`${MODEL_PREFIX}/`, '').replace(/\//g, '.');
  },

  _ajaxRequest(options) {
    options.timeout = REQUEST_TIMEOUT * 1000;
    log('Request: ', options);
    this._super(...arguments);
  }

});
