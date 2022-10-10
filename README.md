# Overview
Simple script to launch a Chromium instance, navigate to a specific URL and then evaluate custom code. 

Installation: 
```bash
npm install "https://github.com/iskandarreza/test-runner" --save-dev
```

Usage example: 
```js
const testRunner = require('@iskandarreza/test-runner')

const config = {
  pageUrl: 'https://github.com/iskandarreza/test-runner',
  codePath: '/example/hello-alert.js'
}

testRunner.launchTest(config)
```

Tips:
* Set `config.watchForChanges = true` if you want the browser to reload and re-evaluate the source code on changes (uses MD5 comparison to check for changes)
* Save the usage example in file (eg. `/tests/launch-test.js`) and add run it as an npm script in your `packages.json` (eg. `node /tests/launch-test.js`)
