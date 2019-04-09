import Route from '@ember/routing/route';
import { get, set, hash } from 'karir/utils/short';

export default Route.extend({

  model() {
    const store = this.get('store');
    const model = {
      articles: store.findAll('article'),
      thoughts: store.findAll('thought')
    };

    model.thoughts.then((result) => {
      const len = result.length;
      let selected, temp;

      result = get(result, 'content');

      for(let i = len-1; i >= 0; i--) {
        selected = Math.round(Math.random() * i);

        temp = result[i];
        result[i] = result[selected];
        result[selected] = temp;
      }

      set(model, 'thoughts', result);
    });

    return hash(model);
  }

});
