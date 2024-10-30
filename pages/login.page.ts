import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  login_input = this.page.getByTestId('login-input');
  password_input = this.page.getByTestId('password-input');
  login_button = this.page.getByTestId('login-button');

  //   await page.getByTestId('password-input').fill(user_password);
  //   await page.getByTestId('login-button').click();
}
