import Mixin from '@ember/object/mixin';
import { jQ, get, run } from 'karir/utils/short';

export default Mixin.create({

  classNames: ['modal'],

	didInsertElement() {
    this._super(...arguments);
    const OPTIONS = {
      dismissible: false
    }

    this._replaceTag('body', 'modal-content');
    this._replaceTag('footer', 'modal-footer');

    this.$().modal(get(this, 'options') || OPTIONS);
  },

  _replaceTag(from, to) {
    const el = this.$(from);
    if(el.length === 0) return;

    let classNames = [to];
    classNames.pushObject(el.attr('class'));

    el.wrapInner(`<div class="${classNames.compact().join(' ')}"></div>`);
    el.children().detach().appendTo(el.parent());
    el.remove();
  }

});
