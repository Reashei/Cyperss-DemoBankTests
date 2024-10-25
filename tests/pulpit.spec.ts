import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const user_id = 'testerlo';
    const user_password = '12345678';

    const receiver_id = '2';
    const transfer_amount = '120';
    const transfer_title = 'przelew';
    const expected_transfer_receiver = 'Chuck Demobankowy';

    // Action
    await page.goto(url);
    await page.getByTestId('login-input').fill(user_id);
    await page.getByTestId('password-input').fill(user_password);
    await page.getByTestId('login-button').click();

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
    const url = 'https://demo-bank.vercel.app/';
    const user_id = 'testerlo';
    const user_password = '12345678';
    const phone_option = '503 xxx xxx';
    const user_amount = '20';

    //Action
    await page.goto(url);
    await page.getByTestId('login-input').fill(user_id);
    await page.getByTestId('password-input').fill(user_password);
    await page.getByTestId('login-button').click();

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
});
