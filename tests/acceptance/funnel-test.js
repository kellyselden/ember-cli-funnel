import { module } from 'qunit';
import { test } from 'ember-qunit';

module('Acceptance | funnel tests');

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
