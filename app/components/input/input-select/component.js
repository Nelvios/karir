import Component from '@ember/component';
import { get, set, isEmpty } from 'karir/utils/short';

export default Component.extend({

  tagName: 'select',

  value: null,
  placeholder: null,
  isPlaceholderDisabled: true,

  didInsertElement() {
    this._super(...arguments);

    const placeholder = get(this, 'placeholder');
    const disabled = get(this, 'isPlaceholderDisabled') ? 'disabled' : '';
    if(placeholder) this.$().prepend(`<option value="" ${disabled}>${placeholder}</option>`);

    this.$().val(get(this, 'value')).formSelect();
  },

  didUpdate() {
    this._super(...arguments);
    const val = get(this, 'value');

    if(isEmpty(val)) this.$().val('').formSelect();
    else this.$().val(val).formSelect();
  },

  change() {
    const val = this.$().val();
    set(this, 'value', isEmpty(val) ? null : val);
  }

});
