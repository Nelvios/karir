import Component from '@ember/component';

export default Component.extend({

  tagName: 'section',

  didInsertElement() {
    this._super(...arguments);

    this.$('.carousel').carousel({
      fullWidth: true,
      indicators: true
    });

    let interval = setInterval(function(){
      this.$('.carousel').carousel('next');
    }, 4500);

    this.$('.carousel').mouseenter(function(){
      clearTimeout(interval)
    });
    this.$('.carousel').mouseleave(function(){
      interval = setInterval(function(){
        this.$('.carousel').carousel('next');
      }, 4500);
    });
  }

});
