import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import config from 'dummy/config/environment';

moduleForAcceptance('Acceptance | funnel tests');

switch (config.testScenario) {
  case undefined:
  case '1':
    test('enabled', function(assert) {
      visit('/');

      andThen(function() {
        assert.ok(find('.included').length, 'it includes properly');
        assert.notOk(find('.excluded').length, 'it excludes properly');
        assert.equal(find('.excluded-style').css('margin-top'), '0px', 'it excludes styles');
      });
    });
    break;
  case '2':
    test('disabled', function(assert) {
      visit('/');

      andThen(function() {
        assert.ok(find('.excluded').length, 'it doesn\'t exclude when disabled');
        assert.equal(find('.excluded-style').css('margin-top'), '123px', 'it doesn\'t exclude styles when disabled');
      });
    });
    break;
}
