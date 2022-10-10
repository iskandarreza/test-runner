const puppeteer = require('puppeteer')
const { assert, expect, should } = require('chai')
const { options } = require('../puppeteer.options')

// expose variables
before(async () => {
  global.assert = assert
  global.expect = expect
  global.should = should
  global.browser = await puppeteer.launch(options)
})
