import Serializer from 'karir/application/serializer';
import { ROOT_URL } from 'karir/utils/properties';

export default Serializer.extend({

  normalizeArrayResponse(store, model, payload, ...args) {
    const keys = Object.keys(payload);
    const data = payload[keys[0]].sortBy('date', 'id');

    payload[keys[0]] = data.reverseObjects().map(item => this._addRootURL(item, 'thumbImage'));
    return this._super(store, model, payload, ...args)
  },

  normalizeSingleResponse(store, model, payload, ...args) {
    const keys = Object.keys(payload);
    const data = payload[keys[0]];

    data.article = this._correctImageSrc(data.article);
    payload[keys[0]] = this._addRootURL(data, 'thumbImage');

    return this._super(store, model, payload, ...args);
  },

  _correctImageSrc(article) {
    return article
        .replace(/src="\/?assets\//g, `src="${ROOT_URL}assets/`)
        .replace(/href="\/?assets\//g, `href="${ROOT_URL}assets/`);
  }

});
