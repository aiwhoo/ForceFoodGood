// Import Chai's expect function for writing assertions
import { expect } from 'chai';

// Import the Cart model we are testing
import Cart from '../core/models/cartModel.js';

// Group all cart tests together
describe('Cart Model Tests', () => {

  // This will run before each test
  // It creates a fresh cart so tests do not affect each other
  let cart;

  beforeEach(() => {
    cart = new Cart();
  });

  // Test 1: Happy Path; Check if a new item is added correctly
  it('adds a new item correctly', () => {
    cart.addItem('Burger', 10, 2);

    // The cart should now have 1 item
    expect(cart.items.length).to.equal(1);

    // Check that the item details are correct
    expect(cart.items[0].name).to.equal('Burger');
    expect(cart.items[0].price).to.equal(10);
    expect(cart.items[0].quantity).to.equal(2);
  });

  // Test 2: If the same item is added again, quantity should increase
  it('updates quantity when adding an existing item', () => {
    cart.addItem('Burger', 10, 1);
    cart.addItem('Burger', 10, 3);

    // It should still only have one item
    expect(cart.items.length).to.equal(1);

    // Quantity should be combined (1 + 3 = 4)
    expect(cart.items[0].quantity).to.equal(4);
  });

  // Test 3: Check if total price is calculated correctly
  it('calculates total correctly', () => {
    cart.addItem('Burger', 10, 2); // 20
    cart.addItem('Fries', 5, 1);   // 5

    const total = cart.calculateTotal();

    // Total should be returned as a string with 2 decimals
    expect(total).to.equal('25.00');
  });

  // Test 4: After checkout, cart should be empty
  it('clears all items after checkout', () => {
    cart.addItem('Burger', 10, 1);
    cart.addItem('Fries', 5, 1);

    cart.checkout();

    // Cart should now be empty
    expect(cart.items.length).to.equal(0);
  });

});
