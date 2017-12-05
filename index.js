/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'ember-cli-funnel',
  included(app) {
    this.app = app;

    this._initOptions();
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

  preprocessTree(type, tree) {
    let options = this.options;
    if (!options.enabled) {
      return tree;
    }

    tree = new Funnel(tree, {
      exclude: options.exclude,
      description: `Funnel (${type}): ${this.name}`
    });

    return tree;
  }
};
