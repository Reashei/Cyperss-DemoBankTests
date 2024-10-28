import { test, expect } from '@playwright/test';

test.describe('User login to Demobank', () => {
  // grupowanie testow

  // przed kazdym testem
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // ustawiamy w configu i mozna tak wywolac stronke
    
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const user_login = 'testerlo';
    const user_password = '12345678';
    const expected_user_name = 'Jan Demobankowy';

    // Action
    await page.getByTestId('login-input').fill(user_login);
    await page.getByTestId('password-input').fill(user_password);
    await page.getByTestId('login-button').click();

    // Assert
    await expect(page.getByTestId('user-name')).toHaveText(expected_user_name);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    //Arrange
    const user_login = 'tester';
    const expected_error_message = 'identyfikator ma min. 8 znaków';

    //Act
    await page.getByTestId('login-input').fill(user_login);
    await page.getByTestId('password-input').click();

    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expected_error_message,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const user_login = 'testerlo';
    const user_password = '1234567';
    const expected_error_message = 'hasło ma min. 8 znaków';

    //Act
    await page.getByTestId('login-input').fill(user_login);
    await page.getByTestId('password-input').fill(user_password);
    await page.getByTestId('password-input').blur(); // blur sprawia ze wychodzimi z okienka (gubimy focus), akurat tutaj, aby wyswietli feedback z passwordem ze jest za krotkie

    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expected_error_message,
    );
  });
});
