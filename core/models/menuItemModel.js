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
const { expect } = require('chai');
const MenuItemModel = require('../core/models/menuItemModel');

describe('MenuItemModel Unit Tests', () => {

    // 1️⃣ Happy Path
    it('should correctly initialize a menu item with all properties', () => {
        const item = new MenuItemModel(
            "Burger",
            9.99,
            "Beef patty with cheese",
            "Main Course"
        );

        expect(item.getName()).to.equal("Burger");
        expect(item.getPrice()).to.equal(9.99);
        expect(item.getDescription()).to.equal("Beef patty with cheese");
        expect(item.getCategory()).to.equal("Main Course");
    });

    // 2️⃣ Edge Case - Default Values
    it('should default description and category to empty strings if not provided', () => {
        const item = new MenuItemModel("Fries", 3.50);

        expect(item.getDescription()).to.equal("");
        expect(item.getCategory()).to.equal("");
    });

    // 3️⃣ Invalid Input Case
    it('should allow price to be stored even if negative (indicates missing validation)', () => {
        const item = new MenuItemModel("InvalidItem", -5);

        expect(item.getPrice()).to.equal(-5);
    });

    // 4️⃣ State Integrity Test
    it('getters should always return the exact constructor values', () => {
        const item = new MenuItemModel("Salad", 6.25, "Fresh greens", "Appetizer");

        expect(item.getName()).to.equal(item.name);
        expect(item.getPrice()).to.equal(item.price);
        expect(item.getDescription()).to.equal(item.description);
        expect(item.getCategory()).to.equal(item.category);
    });

});