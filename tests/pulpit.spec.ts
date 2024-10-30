import { test, expect } from '@playwright/test';
import { login_data } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const user_login = login_data.user_login;
    const user_password = login_data.user_password;

    await page.goto('/');
    const login_page = new LoginPage(page);

    await login_page.login_input.fill(user_login);
    await login_page.password_input.fill(user_password);
    await login_page.login_button.click();
  });

  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiver_id = '2';
    const transfer_amount = '120';
    const transfer_title = 'przelew';
    const expected_transfer_receiver = 'Chuck Demobankowy';

    // Action
    await page.locator('#widget_1_transfer_receiver').selectOption(receiver_id);
    await page.locator('#widget_1_transfer_amount').fill(transfer_amount);
    await page.locator('#widget_1_transfer_title').fill(transfer_title);

    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();
    //await page.getByRole('link', { name: 'Przelew wykonany! Chuck' }).click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(
      `Przelew wykonany! ${expected_transfer_receiver} - ${transfer_amount},00PLN - ${transfer_title}`,
    );
  });

  test('successful mobile top-up', async ({ page }) => {
    //Arrange
    const phone_option = '503 xxx xxx';
    const user_amount = '20';

    //Action
    await page.locator('#widget_1_topup_receiver').selectOption(phone_option);
    await page.locator('#widget_1_topup_amount').fill(user_amount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();

    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toContainText(
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
    await page.locator('#widget_1_topup_receiver').selectOption(phone_option);
    await page.locator('#widget_1_topup_amount').fill(user_amount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();

    await page.locator('#execute_phone_btn').click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toContainText(
      expected_message,
    );
    await expect(page.locator('#money_value')).toHaveText(
      `${expected_balance}`,
    );
  });
});
