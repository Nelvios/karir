import Component from '@ember/component';
import { jQ, get } from 'karir/utils/short';

export default Component.extend({

  tagName: 'section',
  tooltips: [],

  didInsertElement() {
    this._super(...arguments);
    const tooltip = this.$('.tooltip');
    const tooltips = get(this, 'tooltips');

    tooltip.each((idx, el) => {
      tooltips.pushObject(el);
      jQ(el).attr('data-tooltip', jQ(el).text());
      jQ(el).tooltip();
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    const tooltips = get(this, 'tooltips');
    let tooltip;

    do {
      tooltip = tooltips.shiftObject();
      jQ(tooltip).tooltip('destroy');
    } while (tooltip);
  }

});
