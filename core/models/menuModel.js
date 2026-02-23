class Menu {
    constructor(restaurant = "NO RESTAURANT", cuisine = "NONE") {
        this.items = [];
        this.restaurant = restaurant
    }

    // Add a new menu item
    addItem(menuItem) {
        if (menuItem instanceof MenuItemModel) {
            this.items.push(menuItem);
        } else {
            throw new Error("The Menu item that was added is not a menuItemModel object.");
        }
    }

    // Remove item by name
    removeItemByName(name) {
        this.items = this.items.filter(item => item.getName() !== name);
    }

    // Get all menu items
    getAllItems() {
        return this.items;
    }

    // Get items by category
    getItemsByCategory(category) {
        return this.items.filter(item => item.getCategory() === category);
    }
    // Clear entire menu
    clearMenu() {
        this.items = [];
    }
}