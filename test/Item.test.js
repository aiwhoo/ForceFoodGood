import { expect } from 'chai';
import Item from '../core/models/items/Item.js';
import MenuItem from '../core/models/items/MenuItem.js';
import CartItem from '../core/models/items/CartItem.js';

describe("Item Base Class Validation", () => {
    // Why: Validates the base class accepts proper data.
    // Importance: Prevents corrupted items with missing names or prices from breaking the UI.
    it("Should validate a correct item", () => {
        const item = new Item("Burger", 10.99, "Delicious beef burger");
        expect(item.validate()).to.be.true;
    });

    // Why: Edge case testing for negative pricing.
    // Importance: Critical for system stability to ensure customers aren't paid to take food.
    it("Should fail validation for a negative price", () => {
        const item = new Item("Burger", -5, "Delicious beef burger");
        expect(item.validate()).to.be.false;
    });
});

describe("MenuItem Subclass Logic", () => {
    // Why: Validates the subclass override behavior for updating prices.
    // Importance: Ensures restaurant owners can safely update prices.
    it("Should update the price correctly", () => {
        const menuItem = new MenuItem("Fries", 3.99, "Crispy fries");
        menuItem.updatePrice(4.99);
        expect(menuItem.price).to.equal(4.99);
    });
});

describe("CartItem Subclass Logic", () => {
    // Why: Validates the overridden math logic for cart totals.
    // Importance: Crucial for the checkout system to charge the correct amount based on quantity.
    it("Should calculate the subtotal based on quantity", () => {
        const cartItem = new CartItem("Pizza", 15.00, "Cheese pizza");
        expect(cartItem.calculateSubtotal(3)).to.equal(45.00);
    });

    // Why: Validates discount logic specific to cart items.
    // Importance: Prevents invalid discounts (like over 100%) from costing the business money.
    it("Should apply a percentage discount correctly", () => {
        const cartItem = new CartItem("Salad", 10.00, "Green salad");
        cartItem.applyDiscount(20);
        expect(cartItem.price).to.equal(8.00);
    });
});