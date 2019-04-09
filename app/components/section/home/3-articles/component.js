import Component from '@ember/component';

export default Component.extend({

  tagName: 'section',

  didInsertElement() {
    this._super(...arguments);
    const carousel = this.$('.carousel');

    carousel.carousel({
      indicators: true,
      noWrap: true
    });
  }

});
