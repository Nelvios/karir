import EmberObject from '@ember/object';
import PaginationMixin from 'karir/mixins/pagination';
import { module, test } from 'qunit';

module('Unit | Mixin | pagination', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let PaginationObject = EmberObject.extend(PaginationMixin);
    let subject = PaginationObject.create();
    assert.ok(subject);
  });
});
