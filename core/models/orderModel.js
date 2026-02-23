class OrderModel {

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


    updateCost() {
        for (let i = 0; i < this.itemsOrdered.length; i++) {
            this.totalCost += this.itemsOrdered[i].price;
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

    getId() {
        return this.id;
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