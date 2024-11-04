import { Locator, Page } from '@playwright/test';

export class SideMenuComponent {
  payment_link: Locator;

  constructor(private page: Page) {
    this.payment_link = this.page.getByRole('link', { name: 'płatności' });
  }
}
