const { test, expect } = require('@playwright/test');
const { LoginPage }    = require('../pages/LoginPage');
const { Users }        = require('../testData/users');

test.describe('Login Page', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should display the login page correctly', async ({ page }) => {
    await expect(loginPage.logoText).toBeVisible();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(Users.standard.username, Users.standard.password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('should show error for invalid username', async () => {
    await loginPage.login(Users.invalid.username, Users.invalid.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

  test('should show error for invalid password', async () => {
    await loginPage.login(Users.wrongPassword.username, Users.wrongPassword.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username and password do not match');
  });

  test('should show error when username is empty', async () => {
    await loginPage.login(Users.emptyUsername.username, Users.emptyUsername.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Username is required');
  });

  test('should show error when password is empty', async () => {
    await loginPage.login(Users.emptyPassword.username, Users.emptyPassword.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Password is required');
  });

  test('should show error for locked out user', async () => {
    await loginPage.login(Users.locked.username, Users.locked.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Sorry, this user has been locked out');
  });
});
