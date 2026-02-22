class OrderModel {


    constructor(username, address, restaurant) {
        this.username = username;
        this.address = address;
        this.restaurant = restaurant;
        this.totalCost = 0;
        this.itemsOrdered = [];
        this.totalItems = this.itemsOrdered.length;
    }

    updateCost() {
        for (let i = 0; i < this.itemsOrdered.length; i++) {
            this.totalCost += this.itemsOrdered[i].cost;
        }
    }

    getTotalItems() {
        return this.totalItems = this.itemsOrdered.length;
    }

    getUserName() {
        return this.username;
    }

    getUserAddress() {
        return this.address;
    }

    getRestaurant() {
        return this.restaurant;
    }

    getCost() {
        this.updateCost();
        return this.totalCost;
    }

    addMenuItem(aMenuItem) {
        this.itemsOrdered.push(aMenuItem);
    }

    removeMenuItem(aMenuItem) {
        this.itemsOrdered.splice(this.itemsOrdered.indexOf(aMenuItem), 1);
    }

}