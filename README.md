# Overview
Simple script to launch a Chromium instance, navigate to a specific URL and then evaluate custom code. 

Installation: 
```
npm install "https://github.com/iskandarreza/test-runner" --save-dev
```

Usage example: 
```
const testRunner = require('@iskandarreza/test-runner')

const config = {
  pageUrl: 'https://github.com/iskandarreza/test-runner',
  codePath: '/example/hello-alert.js'
}

testRunner.launchTest(config)
```

Set `config.watchForChanges = true` if you want the browser to reload and re-evaluate the source code on changes (uses MD5 comparison to check for changes)