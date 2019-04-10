import Serializer from 'karir/application/serializer';

export default Serializer.extend({

  normalizeArrayResponse(store, model, payload, ...args) {
    const keys = Object.keys(payload);
    const data = payload[keys[0]].sortBy('date', 'id');
    data.reverseObjects();

    payload[keys[0]] = data;
    return this._super(store, model, payload, ...args)
  }

});
