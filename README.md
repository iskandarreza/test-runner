# Overview
Simple script to launch a Chromium instance, navigate to a specific URL and then evaluate custom code. 

Takes two params
> @param {string} pageUrl - The URL of the page you want to test.
>
> @param {string} codePath - The path to the file that contains the code you want to run.

Usage example: 
```
const testRunner = require('./index')

testRunner.launchTest('https://surefoot.me/', 'example/test-code.js')
```

Run `npm run test` to start the example