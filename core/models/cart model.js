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
}

module.exports = CartModel;
