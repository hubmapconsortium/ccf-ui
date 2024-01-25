import { CallToActionSelectors } from './call-to-action.selectors';
describe('CallToActionSelectors', () => {

  const model = {
    message: 'test message',
    title: 'test title',
    callToAction: 'test callToAction',
    imageUrl: 'URL',
    expirationDate: 'December 1, 2020',
    popupShown: false
  };


  it('should return the message', async () => {
    const message = CallToActionSelectors.message(model);
    expect(message).toEqual('test message');
  });

  it('should return call to action', async () => {
    const callToAction = CallToActionSelectors.callToAction(model);
    expect(callToAction).toEqual('test callToAction');
  });

  it('should return imageUrl', async () => {
    const imageUrl = CallToActionSelectors.imageUrl(model);
    expect(imageUrl).toEqual('URL');
  });

  it('should return expirationDate', async () => {
    const expirationDate = CallToActionSelectors.expirationDate(model);
    expect(expirationDate).toEqual('December 1, 2020');
  });

  it('should return the title', async () => {
    const title = CallToActionSelectors.title(model);
    expect(title).toEqual('test title');
  });

  it('should return popupShown', async () => {
    const popupShown = CallToActionSelectors.popupShown(model);
    expect(popupShown).toBeFalse();
  });
});
