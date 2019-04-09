import Component from '@ember/component';
import { get, set, service } from 'karir/utils/short';

export default Component.extend({

  tagName: 'footer',
  store: service(),

  jobs: null,
  links: null,

  didInsertElement() {
    this._super(...arguments);
    const store = get(this, 'store');

    store.findAll('job').then(result => set(this, 'jobs', result.filterBy('featured', true)));

    set(this, 'links', {
      facebook:   'https://www.facebook.com/GoodLifeBCA',
      instagram:  'https://www.instagram.com/goodlifeBCA',
      twitter:    'https://twitter.com/GoodLifeBCA',
      linkedin:   'https://www.linkedin.com/company/pt-bank-central-asia-tbk',
      youtube:    'https://www.youtube.com/solusiBCA'
    });
  }

});
