const testRunner = require('../../index')

const config = {
    pageUrl: 'https://github.com/iskandarreza/test-runner',
    codePath: 'examples/custom-code/hello-alert.js'
}

testRunner.launchTest(config)