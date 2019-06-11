import Serializer from 'karir/application/serializer';

export default Serializer.extend({

  normalizeArrayResponse(store, model, payload, ...args) {
    const keys = Object.keys(payload);
    const data = payload[keys[0]];
    const limit = 4;

    for(let i = data.length-1; i >= 0; i--) {
      let tmp, selected = Math.round(Math.random() * i);
      tmp = data[i]; data[i] = data[selected]; data[selected] = tmp;
    }

    payload[keys[0]] = data.filter((item, idx) => idx < limit);
    return this._super(store, model, payload, ...args);
  }

});
