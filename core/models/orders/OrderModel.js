class OrderModel {
    /*
    username: string
    address: string
    restaurant: RestaurantModel
    id: string
    */
    constructor(username = "NO USERNAME",
                restaurant,
                id) {
        this.username = username;
        this.restaurant = restaurant;
        this.totalCost = 0;
        this.itemsOrdered = [];
        this.totalItems = this.itemsOrdered.length;
        this.id = id
        this.subtotal = 0;
        this.taxTotal = 0;
        this.lastModified = new Date().toISOString();
    }



    // returns number of items in cart
    getTotalItems() {
        return this.totalItems = this.itemsOrdered.length;
    }

    // returns username of customer
    getUserName() {
        return this.username;
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

    // generate summary of an order
    summary() {
        return `Order ${this.id} for ${this.username}`;
    }
    updateLastModified() {
        this.lastModified = new Date().toISOString();
    }



}
export default OrderModel;
