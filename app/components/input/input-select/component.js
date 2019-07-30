import Component from '@ember/component';
import { get, set } from 'karir/utils/short';

export default Component.extend({

  tagName: 'select',

  value: null,
  placeholder: null,

  didInsertElement() {
    this._super(...arguments);

    const placeholder = get(this, 'placeholder');
    if(placeholder) this.$().prepend(`<option value="" disabled>${placeholder}</option>`);

    this.$().val(get(this, 'value')).formSelect();
  },

  didUpdate() {
    this._super(...arguments);

    if(!get(this, 'value')) this.$().val('').formSelect();
  },

  change() {
    const val = this.$().val();
    set(this, 'value', val);
  }

});
