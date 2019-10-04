describe('AutoPlay', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
    await element(by.id('AutoPlay')).tap()
  })

  it('should execute scrollBy(1) every 2.5s', async () => {
    // Initial with first swiper
    await expect(element(by.id('Hello'))).toBeVisible()
    await expect(element(by.id('Beautiful'))).toBeNotVisible()
    await expect(element(by.id('Simple'))).toBeNotVisible()

    // after 2.5s => second swiper
    await new Promise(r => setTimeout(r, 2500))

    await expect(element(by.id('Hello'))).toBeNotVisible()
    await expect(element(by.id('Beautiful'))).toBeVisible()
    await expect(element(by.id('Simple'))).toBeNotVisible()

    // after 5s => second swiper
    await new Promise(r => setTimeout(r, 2500))

    await expect(element(by.id('Hello'))).toBeNotVisible()
    await expect(element(by.id('Beautiful'))).toBeNotVisible()
    await expect(element(by.id('Simple'))).toBeVisible()

    // after 7.5s => second swiper
    await new Promise(r => setTimeout(r, 2500))

    await expect(element(by.id('Hello'))).toBeVisible()
    await expect(element(by.id('Beautiful'))).toBeNotVisible()
    await expect(element(by.id('Simple'))).toBeNotVisible()
  })
})
