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

    store.findAll('job').then(result => set(this, 'jobs', result.filterBy('featured', true).sortBy('name')));

    set(this, 'links', {
      facebook:   'https://www.facebook.com/hashtag/itbca',
      instagram:  'https://www.instagram.com/tags/itbca',
      twitter:    'https://twitter.com/GoodLifeBCA',
      linkedin:   'https://www.linkedin.com/feed/hashtag/itbca',
      youtube:    'https://www.youtube.com/solusiBCA/search?query=%23ITBCA'
    });
  }

});
