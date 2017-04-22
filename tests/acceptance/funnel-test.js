import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import config from 'dummy/config/environment';

moduleForAcceptance('Acceptance | funnel tests');

switch (config.testScenario) {
  case undefined:
  case '1':
    test('it includes properly', function(assert) {
      visit('/');

      andThen(function() {
        assert.ok(find('.included').length);
      });
    });

    test('it excludes properly', function(assert) {
      visit('/');

      andThen(function() {
        assert.notOk(find('.excluded').length);
      });
    });
    break;
  case '2':
    test('it doesn\'t exclude when disabled', function(assert) {
      visit('/');

      andThen(function() {
        assert.ok(find('.excluded').length);
      });
    });
    break;
}
