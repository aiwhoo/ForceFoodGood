class OrderModel {
    /*
    username: string
    address: string
    restaurant: RestaurantModel
    id: string
    */
    constructor(username = "NO USERNAME",
                address = "NO ADDRESS",
                restaurant,
                id) {
        this.username = username;
        this.address = address;
        this.restaurant = restaurant;
        this.totalCost = 0;
        this.itemsOrdered = [];
        this.totalItems = this.itemsOrdered.length;
        this.id = id
    }

    // calculates the cost of the order after adding item to cart
    updateCost() {
        this.totalCost = 0;
        for (let i = 0; i < this.itemsOrdered.length; i++) {
            this.totalCost += this.itemsOrdered[i].price;
        }
    }

    // returns number of items in cart
    getTotalItems() {
        return this.totalItems = this.itemsOrdered.length;
    }

    // returns username of customer
    getUserName() {
        return this.username;
    }

    // returns delivery address
    getUserAddress() {
        return this.address;
    }

     // returns restaurant being ordered from
    getRestaurant() {
        return this.restaurant;
    }

    // returns unique string ID of the order
    getId() {
        return this.id;
    }

    // returns cost of the order
    getCost() {
        return this.totalCost;
    }

    // returns list of items
    getItems() {
        return this.itemsOrdered;
    }

    // adds an item to the order
    addMenuItem(aMenuItem) {
        this.itemsOrdered.push(aMenuItem);
        this.updateCost();
    }
    // removes an item from the order
    removeMenuItem(aMenuItem) {
        this.itemsOrdered.splice(this.itemsOrdered.indexOf(aMenuItem), 1);
        this.updateCost();
    }

}
