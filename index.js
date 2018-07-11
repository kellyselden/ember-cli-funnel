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
        description: 'Funnel (appAndDependencies): ' + this.name
      });

      return tree;
    };

    let _processedTestsTree = this.app._processedTestsTree;
    this.app._processedTestsTree = function() {
      let tree = _processedTestsTree.apply(this, arguments);

      tree = new Funnel(tree, {
        exclude: options.exclude,
        description: 'Funnel (_processedTestsTree): ' + this.name
      });

      return tree;
    };
  },

  preprocessTree(type, tree) {
    if (!this.options.enabled) {
      return tree;
    }

    let options = this.options;

    if (type === 'css') {
      tree = new Funnel(tree, {
        exclude: options.exclude,
        description: 'Funnel (css): ' + this.name
      });
    }

    return tree;
  }
};
