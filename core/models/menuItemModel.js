class MenuItemModel {
    constructor(name, price, description = "", category = "") {
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
        this.expired = Math.random() < 0.2;
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
   isExpired() {
       return this.expired;
   }
}

export default MenuItemModel