const { expect } = require("chai");
const Cart = require("../core/models/cartModel");
const MenuItem = require("../core/models/menuItemModel");

describe("Cart Model Tests", () => {

    it("Happy Path: adds item and calculates correct total", () => {
        const cart = new Cart();
        const item = new MenuItem("Burger", 10);

        cart.addItemToCart(item, 2);
        const total = cart.calculateTotal();

        expect(total).to.equal(20);
    });

    it("Edge Case: adding same item increases quantity instead of duplicating", () => {
        const cart = new Cart();
        const item = new MenuItem("Fries", 5);

        cart.addItemToCart(item, 1);
        cart.addItemToCart(item, 2);

        expect(cart.items.length).to.equal(1);
        expect(cart.items[0].quantity).to.equal(3);
    });

    it("Invalid Input: throws error when adding item with quantity <= 0", () => {
        const cart = new Cart();
        const item = new MenuItem("Soda", 3);

        expect(() => cart.addItemToCart(item, 0)).to.throw();
    });

    it("State Change: checkout empties the cart", () => {
        const cart = new Cart();
        const item = new MenuItem("Pizza", 12);

        cart.addItemToCart(item, 1);
        cart.clear();

        expect(cart.items.length).to.equal(0);
    });

});