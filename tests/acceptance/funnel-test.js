import { module } from 'qunit';
import { test } from 'ember-qunit';
import config from 'dummy/config/environment';

module('Acceptance | funnel tests');

switch (config.testScenario) {
  case undefined:
  case '1':
    test('it includes properly', function(assert) {
      assert.expect(1);

      require('dummy/controllers/included');

      assert.ok(true);
    });

    test('it excludes properly', function(assert) {
      assert.expect(1);

      try {
        require('dummy/controllers/excluded');
      } catch (err) {
        assert.ok(true);
      }
    });
    break;
  case '2':
    test('it doesn\'t exclude when disabled', function(assert) {
      assert.expect(1);

      require('dummy/controllers/excluded');

      assert.ok(true);
    });
    break;
}
