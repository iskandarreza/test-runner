describe('sample test 2', function () {
    let page

    before(async() => {

        page = await browser.newPage()
        await page.goto('https://visualstudio.microsoft.com/', {
            timeout: 0,
            waitUntil: 'domcontentloaded'
        })

        await page.screenshot({ path: 'screenshot.png' })
    })


    it('should have the correct page title', async () => {
        expect(await page.title()).to.include('Visual Studio')
    })
    
    it('should have a heading', async () => {
        const HEADING_SELECTOR = 'h1'
        let heading

        await page.waitForSelector(HEADING_SELECTOR)
        heading = await page.$eval(HEADING_SELECTOR, heading => heading.innerText)

        expect(heading).to.include('make software')
        await page.screenshot({ path: 'screenshot2.png' })

    })

})