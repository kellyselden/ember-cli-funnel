/* eslint-env node */
'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let funnel;
  let exclude = [
    'dummy/services/excluded.js',
    'app/styles/app.css',
    'dummy/tests/unit/services/excluded-test.js'
  ];
  switch (process.env.TEST_SCENARIO) {
    case undefined:
    case '1':
      funnel = {
        enabled: true,
        exclude
      };
      break;
    case '2':
      funnel = {
        enabled: false,
        exclude
      };
      break;
  }
  let app = new EmberAddon(defaults, {
    funnel
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
