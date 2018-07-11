/* global requirejs */
import { module, test } from 'qunit';
import { find, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import config from 'dummy/config/environment';

module('Acceptance | funnel', function(hooks) {
  setupApplicationTest(hooks);

  switch (config.testScenario) {
    case undefined:
    case '1':
      test('enabled', async function(assert) {
        await visit('/');

        assert.dom('.included').exists('it includes properly');
        assert.dom('.excluded').doesNotExist('it excludes properly');
        assert.equal(window.getComputedStyle(find('.excluded-style')).marginTop, '0px', 'it excludes styles');
        assert.notOk(requirejs.entries['my-addon/utils/my-util']);
      });
      break;
    case '2':
      test('disabled', async function(assert) {
        await visit('/');

        assert.dom('.excluded').exists('it doesn\'t exclude when disabled');
        assert.equal(window.getComputedStyle(find('.excluded-style')).marginTop, '123px', 'it doesn\'t exclude styles when disabled');
        assert.ok(requirejs.entries['my-addon/utils/my-util']);
      });
      break;
  }
});
