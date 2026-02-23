class MenuItemModel {
    constructor(name, price, description = "", category = "") {
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
    }
    getName() {
        return this.name;
    }
    getPrice() {
        return this.price;
    }
    getDescription() {
        return this.description;
    }
    getCategory() {
        return this.category;
    }
}
