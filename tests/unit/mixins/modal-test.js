import EmberObject from '@ember/object';
import ModalMixin from 'karir/mixins/modal';
import { module, test } from 'qunit';

module('Unit | Mixin | modal', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let ModalObject = EmberObject.extend(ModalMixin);
    let subject = ModalObject.create();
    assert.ok(subject);
  });
});
