import { test, expect } from '@playwright/test';
import { login_data } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpit_page: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const user_login = login_data.user_login;
    const user_password = login_data.user_password;

    await page.goto('/');
    const login_page = new LoginPage(page);
    await login_page.login(user_login, user_password);

    pulpit_page = new PulpitPage(page);
  });

  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiver_id = '2';
    const transfer_amount = '120';
    const transfer_title = 'przelew';
    const expected_transfer_receiver = 'Chuck Demobankowy';

    // Action
    await pulpit_page.transfer_receiver.selectOption(receiver_id);
    await pulpit_page.transfer_amount.fill(transfer_amount);
    await pulpit_page.transfer_title.fill(transfer_title);

    await pulpit_page.button_do_payment.click();
    await pulpit_page.button_close.click();
    //await page.getByRole('link', { name: 'Przelew wykonany! Chuck' }).click();

    // Assert
    await expect(pulpit_page.show_messages).toHaveText(
      `Przelew wykonany! ${expected_transfer_receiver} - ${transfer_amount},00PLN - ${transfer_title}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    //Arrange
    const phone_option = '503 xxx xxx';
    const user_amount = '20';

    //Action
    await pulpit_page.top_up_receiver.selectOption(phone_option);
    await pulpit_page.top_up_amount.fill(user_amount);
    await pulpit_page.top_up_agreement.click();

    await pulpit_page.button_exec.click();
    await pulpit_page.button_close.click();

    //Assert
    await expect(pulpit_page.show_messages).toContainText(
      `Doładowanie wykonane! ${user_amount},00PLN na numer ${phone_option}`,
    );
  });
  //await expect(page.getByText('Do�adowanie wykonane', { exact: true })).toHaveText('Do�adowanie wykonane');

  test('correct balance after successful mobile top-up', async ({ page }) => {
    //Arrange
    const phone_option = '503 xxx xxx';
    const user_amount = '20';
    const expected_message = `Doładowanie wykonane! ${user_amount},00PLN na numer ${phone_option}`;
    const initial_balance = await page.locator('#money_value').innerText();
    const expected_balance = Number(initial_balance) - Number(user_amount);

    //Action
    await pulpit_page.top_up_receiver.selectOption(phone_option);
    await pulpit_page.top_up_amount.fill(user_amount);
    await pulpit_page.top_up_agreement.click();

    await pulpit_page.button_exec.click();
    await pulpit_page.button_close.click();

    //Assert
    await expect(pulpit_page.show_messages).toContainText(expected_message);
    await expect(pulpit_page.money_value).toHaveText(`${expected_balance}`);
  });
});
