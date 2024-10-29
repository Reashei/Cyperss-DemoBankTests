import { test, expect } from '@playwright/test';
import { login_data } from '../test-data/login.data';

test.describe('Payment tests', () => {
  test.beforeEach(async ({ page }) => {
    const user_login = login_data.user_login;
    const user_password = login_data.user_password;

    await page.goto('/');
    await page.getByTestId('login-input').fill(user_login);
    await page.getByTestId('password-input').fill(user_password);
    await page.getByTestId('login-button').click();
    await page.getByRole('link', { name: 'płatności' }).click();
  });

  test('Simple payment', async ({ page }) => {
    //Arrange
    const transfer_receiver = 'Jan Nowak';
    const transfer_account = '12 3456 7891 1111 2222 3333 44445';
    const transfer_amount = '222';
    const expected_message = `Przelew wykonany! ${transfer_amount},00PLN dla Jan Nowak`;

    //Act
    await page.getByTestId('transfer_receiver').fill(transfer_receiver);
    await page.getByTestId('form_account_to').fill(transfer_account);
    await page.getByTestId('form_amount').fill(transfer_amount);
    await page.getByRole('button', { name: 'wykonaj przelew' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expected_message);
  });
});
