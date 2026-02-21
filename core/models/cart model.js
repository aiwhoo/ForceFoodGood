class CartModel {
    constructor(restaurantId = null) {
        this.restaurantId = restaurantId;
        this.items = [];
    }
}

module.exports = CartModel;
