/*jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var funnel;
  switch (process.env.TEST_SCENARIO) {
    case undefined:
    case '1':
      funnel = {
        enabled: true,
        exclude: ['dummy/controllers/excluded.js']
      };
      break;
    case '2':
      funnel = {
        enabled: false,
        exclude: ['dummy/controllers/excluded.js']
      };
      break;
  }
  var app = new EmberAddon(defaults, {
    funnel: funnel
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
