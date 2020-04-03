describe('AutoPlay', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
    await element(by.id('NestSwiper')).tap()
  })
}
