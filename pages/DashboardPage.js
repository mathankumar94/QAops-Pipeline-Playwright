class DashboardPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.pageTitle        = page.locator('.title');
    this.productList      = page.locator('.inventory_list');
    this.inventoryItems   = page.locator('.inventory_item');
    this.cartIcon         = page.locator('.shopping_cart_link');
    this.cartBadge        = page.locator('.shopping_cart_badge');
    this.menuButton       = page.locator('#react-burger-menu-btn');
    this.logoutLink       = page.locator('#logout_sidebar_link');
    this.sortDropdown     = page.locator('[data-test="product-sort-container"]');
    this.itemNames        = page.locator('.inventory_item_name');
    this.itemPrices       = page.locator('.inventory_item_price');
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');
  }

  async getTitle() {
    return this.pageTitle.textContent();
  }

  async getInventoryItemCount() {
    return this.inventoryItems.count();
  }

  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }

  async getCartBadgeCount() {
    return this.cartBadge.textContent();
  }

  async sortBy(option) {
    // option values: 'az', 'za', 'lohi', 'hilo'
    await this.sortDropdown.selectOption(option);
  }

  async openMenu() {
    await this.menuButton.click();
  }

  async logout() {
    await this.openMenu();
    await this.logoutLink.click();
  }
}

module.exports = { DashboardPage };
