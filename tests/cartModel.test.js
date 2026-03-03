import { expect } from "chai";
import Cart from "../core/models/cartModel.js";

describe("Cart Model Unit Tests", () => {

  // HAPPY PATH
  it("should add an item to the cart", () => {
    const cart = new Cart();
    cart.addItem("Burger", 10.00);

    expect(cart.items.length).to.equal(1);
    expect(cart.items[0].name).to.equal("Burger");
    expect(cart.items[0].quantity).to.equal(1);
  });

  // STATE CHANGE (duplicate item increases quantity)
  it("should increase quantity if item already exists", () => {
    const cart = new Cart();
    cart.addItem("Pizza", 12.00);
    cart.addItem("Pizza", 12.00, 2);

    expect(cart.items.length).to.equal(1);
    expect(cart.items[0].quantity).to.equal(3);
  });

  // BUSINESS LOGIC (calculate total correctly)
  it("should calculate total correctly for multiple items", () => {
    const cart = new Cart();
    cart.addItem("Burger", 10.00, 2);
    cart.addItem("Fries", 5.00, 1);

    const total = cart.calculateTotal();

    expect(total).to.equal("25.00");
  });

  // STATE RESET (checkout clears cart)
  it("should clear the cart after checkout", () => {
    const cart = new Cart();
    cart.addItem("Burger", 10.00);

    cart.checkout();

    expect(cart.items.length).to.equal(0);
  });

});
