import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  transfer_receiver: Locator;
  form_account_to: Locator;
  form_amount: Locator;
  button_do_payment: Locator;
  button_close: Locator;
  show_messages: Locator;
  side_menu_component: SideMenuComponent;

  constructor(private page: Page) {
    const side_menu = new SideMenuComponent(this.page);
    this.transfer_receiver = this.page.getByTestId('transfer_receiver');
    this.form_account_to = this.page.getByTestId('form_account_to');
    this.form_amount = this.page.getByTestId('form_amount');
    this.button_do_payment = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });
    this.button_close = this.page.getByTestId('close-button');
    this.show_messages = this.page.locator('#show_messages');
    this.side_menu_component = new SideMenuComponent(this.page);
  }
}
