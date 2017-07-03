/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-cli-funnel',
  included(app) {
    this.app = app;

    this._initOptions();
    this._injectFunnel();
  },
  _initOptions() {
    let defaultOptions = {
      enabled: this.app.env === 'production',
      exclude: []
    };

    this.options = this.app.options.funnel || {};

    for (let option in defaultOptions) {
      if (!this.options.hasOwnProperty(option)) {
        this.options[option] = defaultOptions[option];
      }
    }
  },
  _injectFunnel() {
    if (!this.options.enabled) {
      return;
    }

    let options = this.options;

    let appAndDependencies = this.app.appAndDependencies;
    this.app.appAndDependencies = function() {
      let tree = appAndDependencies.apply(this, arguments);

      tree = new Funnel(tree, {
        exclude: options.exclude,
        description: 'Funnel: ' + this.name
      });

      return tree;
    };
  }
};
