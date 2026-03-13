
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

    removeItem(name) {
        this.items = this.items.filter(item => item.name !== name);
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

class CustomerCart extends Cart {

    constructor(customerName) {
        super();
        this.customerName = customerName;
    }

    checkout() {
        return `Checkout successful for ${this.customerName}. Total: $${this.calculateTotal()}`;
    }

}

class GiftCart extends Cart {

    constructor(recipientName, message) {
        super();
        this.recipientName = recipientName;
        this.message = message;
    }

    validateGift() {
        if (!this.message) {
            throw new Error("Gift message is required.");
        }
    }

    checkout() {
        this.validateGift();
        return `Gift order for ${this.recipientName}. Total: $${this.calculateTotal()}`;
    }

}
export { Cart, CustomerCart, GiftCart };

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