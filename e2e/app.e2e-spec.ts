import { StonefireFrontendPage } from './app.po';

describe('stonefire-frontend App', () => {
  let page: StonefireFrontendPage;

  beforeEach(() => {
    page = new StonefireFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
