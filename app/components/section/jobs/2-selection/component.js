import Component from '@ember/component';

export default Component.extend({

  tagName: 'section',

  didInsertElement(){
    this._super(...arguments);

    this.$('select').formSelect();
  }
});
