# Overview
Simple script to launch a Chromium instance, navigate to a specific URL and then evaluate custom code. 

### Installation: 
```bash
npm install "https://github.com/iskandarreza/test-runner" --save-dev
```

### Usage example: 
```js
const testRunner = require('@iskandarreza/test-runner')

const config = {
  pageUrl: 'https://github.com/iskandarreza/test-runner',
  codePath: '/example/hello-alert.js'
}

testRunner.launchTest(config)
```

### Tips:
* Set `config.watchForChanges = true` if you want the browser to reload and re-evaluate the source code on changes (uses MD5 comparison to check for changes)
* Save the usage example in a file (eg. `/tests/launch-test.js`) and add/run it as an npm script in your `packages.json` (eg. `node /tests/launch-test.js`)

### Background
I made this so that I can live-preview code that I intend to inject later into a website to customize/add features via bookmarklets, greasemonkey scripts, a/b testing with remote code like Google Optimize, or directly pasting it into the developer tools console.

### Dev Branch Roadmap
Adding support for Mocha tests. The idea is to have a config property, `config.testDir`, that will point to a directory containing unit test spec files. 
