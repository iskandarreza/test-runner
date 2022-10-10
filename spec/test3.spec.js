describe('sample test 3', function () {
    let page, navigationPromise

    before(async () => {

        page = await browser.newPage()
        await page.goto('https://code.visualstudio.com/', {
            timeout: 0,
            waitUntil: 'domcontentloaded'
        })

        navigationPromise = page.waitForNavigation()
    })

    it('should navigate to VSCode docs', async () => {
        await page.waitForSelector('#nav-docs')
        await page.click('#nav-docs')

        await navigationPromise
        
        await page.screenshot({ path: 'screenshot2.png' })
        expect(await page.title()).to.include('Documentation')
    })


    it('should navigate to VSCode API docs', async () => {
        await page.waitForSelector('#nav-extend')
        await page.click('#nav-extend')
        
        await navigationPromise
        
        await page.screenshot({ path: 'screenshot3.png' })
        expect(await page.title()).to.include('API')
    })
})