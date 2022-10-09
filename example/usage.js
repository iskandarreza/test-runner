const testRunner = require('../index')

const config = {
    pageUrl: 'https://github.com/iskandarreza/test-runner',
    codePath: 'example/hello-alert.js'
}

testRunner.launchTest(config)