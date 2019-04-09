import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({

  model() {
    const store = this.get('store');

    return hash({
      articles: store.findAll('article'),
      thoughts: store.findAll('thought')
    });
  }

});
