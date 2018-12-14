import Route from '@ember/routing/route';
import { jQ } from 'karir/utils/short';
import { ONEPAGE_OPTIONS } from 'karir/utils/properties';

export default Route.extend({

  beforeModel() {
    this._super(...arguments);

  }

});
