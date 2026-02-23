class MenuItem {
    constructor(name, price, description, category) {
        if (price < 0) {
            throw new Error("Price must be 0 or greater");
        }
        this.name = name;
        this.price = price;
        this.description = description;
        this.category = category;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        if (price < 0) {
            throw new Error("Price must be 0 or greater");
        }
        this.price = price;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

    getCategory() {
        return this.category;
    }

    setCategory(category) {
        this.category = category;
    }
}

class MenuModel {
    constructor(name) {
        this.name = name;
        this.items = [];
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getItems() {
        return this.items;
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(itemName) {
        const index = this.items.findIndex(item => item.name === itemName);
        if (index === -1) {
            throw new Error("Item not found in menu");
        }
        this.items.splice(index, 1);
    }

    getItemsByCategory(category) {
        return this.items.filter(item => item.category === category);
    }
}
