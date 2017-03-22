/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    testScenario: process.env.TEST_SCENARIO
  };
};
