import puppeteer from 'puppeteer'

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const addProductsToBasket = async (urls: any) => {
    try {

        const browser = await puppeteer.launch({ headless: false, executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome' });
        await sleep(1000);
        const mainPage = await browser.newPage();
        mainPage.setDefaultNavigationTimeout(0);
        await mainPage.goto('https://buy.am');

        const addToBasketPromisesArray = urls.map(async (url: any) => {
            const page = await browser.newPage();
            page.setDefaultNavigationTimeout(0);
            await page.goto(url);

            await sleep(2000)
            const isOrderModalExistArray = await page.$$('.quick-view.is--active');

            await sleep(5000)
            if (isOrderModalExistArray.length) {
                const [button] = await page.$x("//button[contains(., 'Ավելացնել զամբյուղ')]");
                await button?.click();
                await sleep(3000)
                await page.close()
            } else {
                console.log('invalid order')
                await page.close()
            }

        });

        await Promise.all(addToBasketPromisesArray)
        await mainPage.bringToFront()

        await mainPage.goto("https://buy.am/hy/checkout/cart")
      

    } catch (e) {
        console.error(e)
    }


}


export default addProductsToBasket
