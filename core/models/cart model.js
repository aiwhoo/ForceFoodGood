/**
 * CartModel API
 * -----------------
 * Class to manage a shopping cart for a single restaurant.
 *
 * Constructor:
 *   CartModel(restaurantId = null)
 *
 * Methods:
 *   addItem(itemId, name, price, quantity = 1)
 *   removeItem(itemId)
 *
 * Example:
 *   const cart = new CartModel();
 *   cart.addItem(1, "Burger", 5.99, 2);
 */

class CartItemModel {
    constructor(itemId, name, price, quantity = 1) {
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than 0");
        }

        this.itemId = itemId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }
}

class CartModel {
    constructor(restaurantId = null) {
        this.restaurantId = restaurantId;
        this.items = [];
    }
    // Function to add item(s) to cart
    addItem(itemId, name, price, quantity = 1) {
    // Check if item already exists in the cart
    for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].itemId === itemId) {
            this.items[i].quantity += quantity;
            return;
        }
    }

    // Create new item in cart(classItemModel will validate quantity)
    const newItem = new CartItemModel(itemId, name, price, quantity);
    this.items.push(newItem);
}
    // Function to remove an item completely from the cart
    removeItem(itemId) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].itemId === itemId) {
                // splice removes the item at index i from the items array
                this.items.splice(i, 1); 
                return;
            }
        }
        // If we didn’t find the item
        throw new Error("Item not found in cart");
    }
}

module.exports = CartModel;
