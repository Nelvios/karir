import DS from 'ember-data';
import { ROOT_URL, MODEL_PREFIX } from 'karir/utils/properties';
import { log } from 'karir/utils/short';

export default DS.RESTSerializer.extend({

  normalizeArrayResponse(store, model, payload, ...args) {
    const keys = Object.keys(payload);

    payload[`${MODEL_PREFIX}/${keys[0]}`] = payload[keys[0]];
    delete payload[keys[0]];

    log('Response:', payload);
    return this._super(store, model, payload, ...args);
  },

  normalizeSingleResponse(store, model, payload, ...args) {
    const keys = Object.keys(payload);

    payload[`${MODEL_PREFIX}/${keys[0]}`] = payload[keys[0]];
    delete payload[keys[0]];

    log('Response:', payload);
    return this._super(store, model, payload, ...args);
  },

  _addRootURL(item, property) {
    let str = item[property];

    if(str.substr(0, 1) === '/') str = str.substr(1);
    item[property] = `${ROOT_URL}${str}`;

    return item;
  }

});
