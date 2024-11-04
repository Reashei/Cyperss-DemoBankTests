import { test, expect } from '@playwright/test';
import { login_data } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

// grupowanie testów
test.describe('User login to Demobank', () => {
  let login_page: LoginPage; // wrzucamy zamiast deklarowac const z klasa dla kazdego testu

  // przed kazdym testem
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // ustawiamy w configu i mozna tak wywolac stronke
    login_page = new LoginPage(page); // i tak samo tutaj, wrzucamu w beforeach i describe
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const user_login = login_data.user_login;
    const user_password = login_data.user_password;
    const expected_user_name = 'Jan Demobankowy';

    // Action
    await login_page.login(user_login, user_password);

    // Assert
    const pulpit_page = new PulpitPage(page);
    await expect(pulpit_page.username_text).toHaveText(expected_user_name);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    //Arrange
    const incorrect_user_login = 'tester';
    const expected_error_message = 'identyfikator ma min. 8 znaków';

    //Act
    await login_page.login_input.fill(incorrect_user_login);
    await login_page.password_input.click();

    //Assert
    await expect(login_page.login_error).toHaveText(expected_error_message);
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    //Arrange
    const user_login = login_data.user_login;
    const incorrect_user_password = '1234567';
    const expected_error_message = 'hasło ma min. 8 znaków';

    //Act
    await login_page.login_input.fill(user_login);
    await login_page.password_input.fill(incorrect_user_password);
    await login_page.password_input.blur(); // blur sprawia ze wychodzimi z okienka (gubimy focus), akurat tutaj, aby wyswietli feedback z passwordem ze jest za krotkie

    //Assert
    await expect(login_page.password_error).toHaveText(expected_error_message);
  });
});
