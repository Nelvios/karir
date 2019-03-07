import Component from '@ember/component';

export default Component.extend({

  tagName: 'section',

  didInsertElement() {
    this._super(...arguments);

    this.$('.carousel').carousel({
      fullWidth: true,
      indicators: true
    });
  }

});
