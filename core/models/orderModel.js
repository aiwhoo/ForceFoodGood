class OrderModel {
    /*
    Constructor takes in:
    a username,
    user address,
    the restaurant (as a restaurant object),
    an ID number.
    If these params aren't stated, then they will default to a string
     */
    constructor(username = "NO USERNAME",
                address = "NO ADDRESS",
                restaurant = "NO RESTAURANT",
                id = "NO ID") {
        this.username = username;
        this.address = address;
        this.restaurant = restaurant;
        this.totalCost = 0;
        this.itemsOrdered = [];
        this.totalItems = this.itemsOrdered.length;
        this.id = id
    }

    // iterates through the list itemsOrdered to find the sum of the total cost
    updateCost() {
        this.totalCost = 0;
        for (let i = 0; i < this.itemsOrdered.length; i++) {
            this.totalCost += this.itemsOrdered[i].price;
        }
    }

    // returns the length of itemsOrdered
    getTotalItems() {
        return this.totalItems = this.itemsOrdered.length;
    }

    // returns username
    getUserName() {
        return this.username;
    }

    // returns userAddress
    getUserAddress() {
        return this.address;
    }

    // returns restaurant
    getRestaurant() {
        return this.restaurant;
    }

    // returns id
    getId() {
        return this.id;
    }

    // adds a specified menuItem
    addMenuItem(aMenuItem) {
        this.itemsOrdered.push(aMenuItem);
    }

    // removes a specified menuItem
    removeMenuItem(aMenuItem) {
        this.itemsOrdered.splice(this.itemsOrdered.indexOf(aMenuItem), 1);
    }

}