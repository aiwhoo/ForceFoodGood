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
