
# Cart Model – Test Analysis

## Test 1: Happy Path – Adding a New Item

### A. What is being tested?

This test validates that `addItem()` works correctly and adds a new item to the cart with the provided name, price, and quantity.

### B. Why is this important?

Adding items to the cart is the core functionality of the Cart model. If this fails, the cart cannot function properly.

### C. What could break if this fails?

If items are not stored correctly:

* Users may see incorrect cart contents.
* Orders may contain wrong items or quantities.
* Total calculations could become inaccurate.

### D. What type of test is this?

Validation / Functional test

### E. What is the benefit of testing this?

This test helps make sure the cart stores items correctly and continues to work properly if changes are made to the code later.

---

## Test 2: Edge Case – Default Quantity Behavior

### A. What is being tested?

This test verifies that when `addItem()` is called without specifying a quantity, the quantity defaults to 1.

### B. Why is this important?

The method defines a default parameter (`quantity = 1`). If this behavior breaks, items could be added with undefined or incorrect quantities.

### C. What could break if this fails?

* Items could be added with quantity 0 or undefined.
* Total calculations may become incorrect.

### D. What type of test is this?

Boundary condition / validation

### E. What is the benefit of testing this?

It ensures consistent behavior when optional parameters are omitted and protects against unexpected state errors.

---

## Test 3: Failure Case – Checkout on Empty Cart

### A. What is being tested?

This test ensures that attempting to checkout an empty cart throws an error.

### B. Why is this important?

Checkout should not be allowed when the cart has no items. This enforces a business rule preventing invalid orders.

### C. What could break if this fails?

* The system could allow empty orders.
* Backend systems may process invalid transactions.


### D. What type of test is this?

Error handling / Business rule enforcement

### E. What is the benefit of testing this?

It protects system integrity and prevents invalid transactions from occurring.

---

## Test 4: State Change – Checkout Clears Cart

### A. What is being tested?

This test validates that calling `checkout()` clears all items from the cart.

### B. Why is this important?

After checkout, the cart should reset to an empty state to prevent duplicate purchases or inconsistent cart behavior.

### C. What could break if this fails?

* Items may remain in the cart after checkout.
* Users could be charged multiple times.
* The application state may become inconsistent.

### D. What type of test is this?

State change validation

### E. What is the benefit of testing this?

This makes sure the cart resets correctly after checkout and continues to work properly if the code is changed later.

