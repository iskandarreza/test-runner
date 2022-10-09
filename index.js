const puppeteer = require('puppeteer')
const appRoot = require('app-root-path');
const fs = require('fs')

/**
 * Launch a browser, go to a page, and run a script on that page.
 * @param {string} pageUrl - The URL of the page you want to test.
 * @param {string} codePath - The absolute path to the file that contains the code you want to run.
 */
exports.launchTest = async (pageUrl, codePath) => {
    if(Array.from(codePath)[0] !== '/') {
        codePath = '/' + codePath
    }
    const file_path = `${appRoot + codePath}`
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

    await page.goto(pageUrl, { waitUntil: 'domcontentloaded' })
    
    if (file_content.length <= 0) {
        console.info('INFO: file is empty. Is the path to the file correct?')
        console.info('Path: ', file_path )
    } else {
        await page.evaluate(((file_content) => {
            file_content
        }, file_content))
        .then(() => { console.info('INFO: code was evaluated')})
    }
}