const puppeteer = require('puppeteer')
const { expect } = require('chai')

// puppeteer options
const opts = {
    headless: false, slowMo: 250,
    args: [
        '--window-size=1920,1080',
        '--allow-file-access-from-files'
    ],
    defaultViewport: {
        width: 1920,
        height: 1080
    },
    timeout: 15000
}
  
  // expose variables
  before (async () => {
    global.expect = expect
    global.browser = await puppeteer.launch(opts)
  })
