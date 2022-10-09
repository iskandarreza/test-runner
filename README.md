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