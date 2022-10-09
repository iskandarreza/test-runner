const puppeteer = require('puppeteer')
const appRoot = require('app-root-path')
const path = require('path')
const fs = require('fs')

const defaultConfig = {
    pageUrl: '',
    codePath: `${path.join(__dirname, 'example/invert.js')}`
}

exports.launchTest = async (config) => {

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


    let file_path = config.codePath

    if (file_path !== defaultConfig.codePath) {

        file_path = `${appRoot + '/' + config.codePath}`

        if (Array.from(config.codePath)[0] !== '/') {
            console.warn(`WARNING: Missing leading slash in code absolute path, pre-pending '/'`)
            console.info('')
            file_path = `${appRoot + '/' + config.codePath}`
        }

    } 

    const file_content = fs.existsSync(file_path) ? fs.readFileSync(file_path, 'utf8') : ''
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
    
    if (file_content.length <= 0) {
        console.info('INFO: file is empty. Is the path to the file correct?')
        console.info('Path: ', file_path )
        console.info('')
    } else {
        await page.evaluate(((file_content) => {
            file_content
        }, file_content))
        .then(() => { console.info('INFO: code was evaluated')})
    }
}