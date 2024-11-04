import { Locator, Page } from '@playwright/test';

export class LoginPage {
  login_input: Locator;
  password_input: Locator;
  login_button: Locator;
  login_error: Locator;
  password_error: Locator;

  constructor(private page: Page) {
    this.login_input = this.page.getByTestId('login-input');
    this.password_input = this.page.getByTestId('password-input');
    this.login_button = this.page.getByTestId('login-button');
    this.login_error = this.page.getByTestId('error-login-id');
    this.password_error = this.page.getByTestId('error-login-password');

  }
  async login(user_login: string, user_password: string): Promise<void> {
    await this.login_input.fill(user_login);
    await this.password_input.fill(user_password);
    await this.login_button.click();
  }
}
