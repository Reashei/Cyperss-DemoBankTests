import { test, expect } from '@playwright/test';
import { login_data } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Payment tests', () => {
  let payment_page: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const user_login = login_data.user_login;
    const user_password = login_data.user_password;

    await page.goto('/');
    const login_page = new LoginPage(page);
    await login_page.login(user_login, user_password);

    const pulpit_page = new PulpitPage(page);
    await pulpit_page.side_menu_component.payment_link.click();
  });

  test('Simple payment', async ({ page }) => {
    //Arrange
    const transfer_receiver = 'Jan Nowak';
    const transfer_account = '12 3456 7891 1111 2222 3333 44445';
    const transfer_amount = '222';
    const expected_message = `Przelew wykonany! ${transfer_amount},00PLN dla Jan Nowak`;

    //Act
    payment_page = new PaymentPage(page);
    await payment_page.make_transfer(
      transfer_receiver,
      transfer_account,
      transfer_amount,
    );

    //Assert
    await expect(payment_page.show_messages).toHaveText(expected_message);
  });
});
