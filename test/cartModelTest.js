import { expect } from "chai";
import { CustomerCart, GiftCart } from "../core/models/cartModel.js";

describe("Cart Hierarchy Tests", () => {

    it("should add items to cart", () => {
        const cart = new CustomerCart("Jay");
        cart.addItem("Burger", 5, 2);

        expect(cart.getItems().length).to.equal(1);
    });

    it("should calculate total correctly", () => {
        const cart = new CustomerCart("Jay");
        cart.addItem("Burger", 5, 2);

        expect(cart.calculateTotal()).to.equal("10.00");
    });

    it("should checkout normally for CustomerCart", () => {
        const cart = new CustomerCart("Jay");
        cart.addItem("Burger", 5, 1);

        const result = cart.checkout();

        expect(result).to.include("Checkout successful");
    });

    it("should require gift message for GiftCart", () => {
        const cart = new GiftCart("Alex", "");

        expect(() => cart.validateGift()).to.throw();
    });

});