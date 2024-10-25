import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
    test('quick payment with correct data', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('testerlo');
        await page.getByTestId('password-input').fill('12345678');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('120');
        await page.locator('#widget_1_transfer_title').fill('przelew');

        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();
        //await page.getByRole('link', { name: 'Przelew wykonany! Chuck' }).click();

        await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck');
    });

    test.only('successful mobile top-up', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('testerlo');
        await page.getByTestId('password-input').fill('12345678');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_topup_receiver').selectOption('503 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill('20');
        await page.locator('#uniform-widget_1_topup_agreement span').click();

        await page.locator('#execute_phone_btn').click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toContainText('Do³adowanie wykonane! 20,00PLN na numer 503 xxx xxx')
    });
        //await expect(page.getByText('Do³adowanie wykonane', { exact: true })).toHaveText('Do³adowanie wykonane');

});