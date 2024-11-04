import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  transfer_receiver: Locator;
  transfer_amount: Locator;
  transfer_title: Locator;
  button_do_payment: Locator;
  button_close: Locator;
  show_messages: Locator;
  top_up_receiver: Locator;
  top_up_amount: Locator;
  top_up_agreement: Locator;
  button_exec: Locator;
  money_value: Locator;
  username_text: Locator;
  payment_button: Locator;
  side_menu_component: SideMenuComponent;

  constructor(private page: Page) {
    this.payment_button = this.page.getByRole('link', { name: 'płatności' });
    this.transfer_receiver = this.page.locator('#widget_1_transfer_receiver');
    this.transfer_amount = this.page.locator('#widget_1_transfer_amount');
    this.transfer_title = this.page.locator('#widget_1_transfer_title');
    this.button_do_payment = this.page.getByRole('button', { name: 'wykonaj' });
    this.button_close = this.page.getByTestId('close-button');
    this.show_messages = this.page.locator('#show_messages');
    this.top_up_receiver = this.page.locator('#widget_1_topup_receiver');
    this.top_up_amount = this.page.locator('#widget_1_topup_amount');
    this.top_up_agreement = this.page.locator(
      '#uniform-widget_1_topup_agreement span',
    );
    this.button_exec = this.page.locator('#execute_phone_btn');
    this.money_value = this.page.locator('#money_value');
    this.username_text = this.page.getByTestId('user-name');
    this.side_menu_component = new SideMenuComponent(this.page);
  }
}
