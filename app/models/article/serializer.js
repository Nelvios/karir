import Serializer from 'karir/application/serializer';

export default Serializer.extend({

  normalizeArrayResponse(store, model, payload, ...args) {
    const keys = Object.keys(payload);
    const data = payload[keys[0]].sortBy('date', 'id');

    payload[keys[0]] = data.reverseObjects();
    return this._super(store, model, payload, ...args)
  },

  normalizeSingleResponse(store, model, payload, ...args) {
    const keys = Object.keys(payload);
    const data = payload[keys[0]];

    data.article = this._correctImageSrc(data.article);
    payload[keys[0]] = data;

    return this._super(store, model, payload, ...args);
  },

  _correctImageSrc(article) {
    return article.replace(/src="assets\//g, `src="/assets/`);
  }

});
