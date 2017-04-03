# ember-cli-funnel

[![Greenkeeper badge](https://badges.greenkeeper.io/kellyselden/ember-cli-funnel.svg)](https://greenkeeper.io/)

[![npm version](https://badge.fury.io/js/ember-cli-funnel.svg)](https://badge.fury.io/js/ember-cli-funnel)
[![Build Status](https://travis-ci.org/kellyselden/ember-cli-funnel.svg?branch=master)](https://travis-ci.org/kellyselden/ember-cli-funnel)

Exclude files from an ember build

### Installation

```
ember install ember-cli-funnel
```

### Example

```js
// ember-cli-build.js

var app = new EmberApp(defaults, {
  funnel: {
    exclude: [defaults.project.pkg.name + '/routes/style-guide/**/*']
  }
});
```

### Options

* `enabled` (bool): defaults to only in production
* `exclude` (array of globs): defaults to empty array

### Advanced Example 1

Exclude route files and router definitions from the `master` branch build

```
ember install ember-git-version
npm install git-repo-info --save-dev
```

```js
// ember-cli-build.js

var getRepoInfo = require('git-repo-info');

var info = getRepoInfo();

var app = new EmberApp(defaults, {
  funnel: {
    enabled: info.branch === 'master',
    exclude: [defaults.project.pkg.name + '/routes/style-guide/**/*']
  }
});
```

```js
// app/router.js

if (config.branch !== 'master') {
  this.route('style-guide', function() {
    // ...
  });
}
```

### Advanced Example 2

Exclude different files for different environments

```js
// ember-cli-build.js

var exclude = [];

switch (EmberApp.env()) {
  case 'development':
    exclude.push(defaults.project.pkg.name + '/routes/prod-only/**/*');
    break;
  case 'production':
    exclude.push(defaults.project.pkg.name + '/routes/dev-only/**/*');
    break;
}

var app = new EmberApp(defaults, {
  funnel: {
    enabled: true,
    exclude: exclude
  }
});
```
