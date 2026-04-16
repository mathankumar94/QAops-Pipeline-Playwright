const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');
const { Users } = require('../testData/users');

test.describe('Dashboard Page', () => {
  let dashboardPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(Users.standard.username, Users.standard.password);
    dashboardPage = new DashboardPage(page);
  });

  test('should display the dashboard with correct title', async () => {
    const title = await dashboardPage.getTitle();
    expect(title).toBe('Products');
  });

  test('should display 6 inventory items', async () => {
    const count = await dashboardPage.getInventoryItemCount();
    expect(count).toBe(6);
  });

  test('should display product list', async () => {
    await expect(dashboardPage.productList).toBeVisible();
    await expect(dashboardPage.inventoryItems.first()).toBeVisible();
  });

  test('should add item to cart and update badge', async () => {
    await dashboardPage.addFirstItemToCart();
    const badge = await dashboardPage.getCartBadgeCount();
    expect(badge).toBe('1');
  });

  test('should sort products A to Z', async () => {
    await dashboardPage.sortBy('az');
    const names = await dashboardPage.itemNames.allTextContents();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('should sort products Z to A', async () => {
    await dashboardPage.sortBy('za');
    const names = await dashboardPage.itemNames.allTextContents();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test('should sort products by price low to high', async () => {
    await dashboardPage.sortBy('lohi');
    const priceTexts = await dashboardPage.itemPrices.allTextContents();
    const prices = priceTexts.map((p) => parseFloat(p.replace('$', '')));
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('should sort products by price high to low', async () => {
    await dashboardPage.sortBy('hilo');
    const priceTexts = await dashboardPage.itemPrices.allTextContents();
    const prices = priceTexts.map((p) => parseFloat(p.replace('$', '')));
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });

  test('should navigate to cart page on cart icon click', async ({ page }) => {
    await dashboardPage.cartIcon.click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  });

  test('should logout successfully', async ({ page }) => {
    await dashboardPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('#login-button')).toBeVisible();
  });
});
