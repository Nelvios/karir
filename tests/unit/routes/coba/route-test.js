import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | routes/coba', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:routes/coba');
    assert.ok(route);
  });
});
