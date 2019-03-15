import Component from '@ember/component';
import { jQ } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',

  didInsertElement() {
    this._super(...arguments);
    const tooltip = this.$('.tooltip');

    tooltip.each((idx, el) => {
      jQ(el).attr('data-tooltip', jQ(el).text());
      jQ(el).tooltip();
    });
  }

});
