class RestaurantModel {
    constructor(name, address) {
        this.name = name;
        this.address = address;
    }
    getName() {
        return this.name;
    }
    getAddress() {
        return this.address;
    }
    setAddress(address) {
        this.address = address;
    }
    setName(name) {
        this.name = name;
    }
}