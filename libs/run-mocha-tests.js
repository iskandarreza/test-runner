const appRoot = require('app-root-path')
const Mocha = require('mocha')
const fs = require('fs')
const path = require('path')

// Instantiate a Mocha instance.
const mocha = new Mocha()

const defaultTestDir = `${appRoot + '/spec'}`

const runTests = (testDir) => {
    mocha.addFile(`${path.join(__dirname, '../unit-testing/bootstrap.js')}`)

    if (!testDir) {
        testDir = defaultTestDir
    }

    // Add each .js file to the mocha instance
    fs.readdirSync(testDir).filter(function (file) {
        // Only keep the .js files
        return file.substr(-3) === '.js'
    
    }).forEach(function (file) {
        mocha.addFile(
            path.join(testDir, file)
        )
    })
    
    mocha.timeout(15000);
    
    // Run the tests.
    mocha.run(function (failures) {
        process.exitCode = failures ? 1 : 0  // exit with non-zero status if there were failures
    })
}

exports.runTests = runTests