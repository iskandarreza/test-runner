const puppeteer = require('puppeteer')
const appRoot = require('app-root-path')
const path = require('path')
const fs = require('fs')
const md5 = require('md5')

const { runTests } = require('./unit-testing/runner')

const defaultConfig = {
    pageUrl: 'https://visualstudio.microsoft.com/',
    codePath: `${path.join(__dirname, 'example/invert.js')}`,
    watchForChanges: false
}

/**
 * If the first character of the file path is not a forward slash, then prepend the file path with a
 * forward slash.
 * @param {string} FILE_PATH - The path to the file you want to read.
 * @returns {string} the value of the function call.
 */
const checkLeadingSlash = (FILE_PATH) => {
    if (Array.from(FILE_PATH)[0] !== '/') {
        console.warn(`WARNING: Missing leading slash in code absolute path, pre-pending '/'`)
        console.info('')
        return `${appRoot + '/' + FILE_PATH}`
    }
}

const FILE_CONTENT = (FILE_PATH) => fs.existsSync(FILE_PATH) ? fs.readFileSync(FILE_PATH, 'utf8') : ''

/**
 * It takes a config object, and if the config object has a pageUrl and codePath property, it will
 * launch a browser, navigate to the pageUrl, and evaluate the code in the file at the codePath.
 * The browser will reload and re-evaluate the code of watchForChanges property is set to true.
 * 
 * The codePath is relative to the root of the project.
 * 
 * The values from the defaultConfig object is used if the config object is missing either the pageUrl or codePath
 * property.
 * 
 * The defaultConfig object is defined as follows:
 * 
 * const defaultConfig = {
 *     pageUrl: 'file:///Users/Izzy/Desktop/test.html',
 *     codePath: '/Users/Izzy/Desktop/test.js'
 *     watchForChanges: false
 * }
 * @param {object} config - configuration object 
 */
const launch = async (config) => {

    // Check configuration
    console.info('INFO: Current config:')
    console.info({pageUrl: config.pageUrl, codePath: config.codePath})
    console.info('')

    
    if (!config?.pageUrl) {
        console.warn('WARNING: pageUrl not provided, using defaults')    
        config.pageUrl = defaultConfig.pageUrl
    }
    if (!config?.codePath) {
        console.warn('WARNING: codePath not provided, using defaults')    
        config.codePath = defaultConfig.codePath
    } 
    console.info('')


    // Update file paths 
    let FILE_PATH = config.codePath

    if (FILE_PATH !== defaultConfig.codePath) {

        FILE_PATH = `${appRoot + '/' + config.codePath}`

        FILE_PATH = checkLeadingSlash(config.codePath)
    } 

    let _FILE_CONTENT = FILE_CONTENT(FILE_PATH)
    

    // Start browser instance and navigate to given URL
    const browser = await puppeteer.launch({
        headless: false, slowMo: 250, 
        args: [
            '--window-size=1920,1080', 
            '--allow-file-access-from-files'
        ],
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    })

    const page = await browser.newPage()

    await page.goto(config.pageUrl, { waitUntil: 'domcontentloaded' })
    
    // Check if file content is empty, which might mean the path isn't set properly 
    if (_FILE_CONTENT.length <= 0) {
        console.info('INFO: file is empty. Is the path to the file correct?')
        console.info('Path: ', FILE_PATH )
        console.info('')
    } else {
        // Evaluate the code
        await page.evaluate(((CODE_TO_EVAL) => {
            CODE_TO_EVAL
        }, _FILE_CONTENT))
        .then(() => { console.info('INFO: code was evaluated')})
    }

    // Reload the page if the code source file changes 
    if (config.watchForChanges === true) {
        let md5Previous = null
        let fsWait = false

        fs.watch(FILE_PATH, async (e, filename) => {
            if (filename) {
                if (fsWait) return
                fsWait = setTimeout(() => {
                    fsWait = false
                }, 100)
                const md5Current = md5(fs.readFileSync(FILE_PATH));
                if (md5Current === md5Previous) {
                    return
                }
                md5Previous = md5Current;
                console.log(`${FILE_PATH} file changed. Reloading page.`)

                _FILE_CONTENT = FILE_CONTENT(FILE_PATH)
                
                await page.goto(config.pageUrl, { waitUntil: 'domcontentloaded' })
                await page.evaluate(((CODE_TO_EVAL) => {
                    CODE_TO_EVAL
                }, _FILE_CONTENT))
                .then(() => { console.info('INFO: code was evaluated')})
            }
        })
    }
}


exports.launchTest = launch

exports.runTests = runTests