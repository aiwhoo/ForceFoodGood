
class Cart {
    constructor() {
        this.items = [];
    }

    addItem(name, price, quantity = 1) {
        const existingItem = this.items.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ name, price, quantity });
        }
    }

    calculateTotal() {
        let total = 0;
        for (let item of this.items) {
            total += item.price * item.quantity;
        }
        return total.toFixed(2);
    }

    checkout() {
        this.items = [];
    }
}

export default Cart;

function checkout(cart) {
  // Prevent checkout if cart is empty
  if (cart.items.length === 0) {
    throw new Error("Cannot checkout with an empty cart.");
  }

  // Simulate order processing
  console.log("Processing order...");
  const orderSuccessful = true; // makes sure the order is successful before clearing cart

  if (orderSuccessful) {
    // Clear the cart
    cart.items = [];

    console.log("Checkout successful. Cart has been cleared.");
  }
}