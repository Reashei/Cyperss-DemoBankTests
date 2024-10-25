import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  // grupowanie testow

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const url = 'https://demo-bank.vercel.app/';
    const user_id = 'testerlo';
    const user_password = '12345678';
    const expected_user_name = 'Jan Demobankowy';

    // Action
    await page.goto(url);
    await page.getByTestId('login-input').fill(user_id);
    await page.getByTestId('password-input').fill(user_password);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expected_user_name);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('tester');
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText(
      'identyfikator ma min. 8 znak�w',
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/');
    await page.getByTestId('login-input').fill('testerlo');
    await page.getByTestId('password-input').fill('1234567');
    await page.getByTestId('password-input').blur(); // blur sprawia ze wychodzimi z okienka (gubimy focus), akurat tutaj, aby wyswietli feedback z passwordem ze jest za krotkie

    await expect(page.getByTestId('error-login-password')).toHaveText(
      'has�o ma min. 8 znak�w',
    );
  });
});
