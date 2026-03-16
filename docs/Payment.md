## Payment Method Polymorphism Feature

### Overview

This feature implements a polymorphic payment processing system for the ForceFoodGood application. The goal of this feature is to support multiple payment types while maintaining a clean and scalable object-oriented architecture.

The implementation introduces a base class called **PaymentModel**, along with three subclasses representing specific payment methods:

- CreditCard
- PayPal
- GiftCard

Each subclass extends the base class and overrides certain methods to implement payment-specific validation and processing behavior.

This design demonstrates **polymorphism**, allowing the system to treat different payment methods through a shared interface while still supporting unique logic for each payment type.

---

### Class Hierarchy

The payment system follows the inheritance structure below:

```
PaymentModel (Base Class)
   ↑
CreditCard
PayPal
GiftCard
```

The base class provides shared functionality, including:

- Storing the payment amount
- Base validation logic
- A common method interface for payment processing

Each subclass overrides the validation logic and the payment processing method to implement behavior specific to that payment type.

---

### Polymorphism Implementation

Polymorphism is demonstrated through the `processPayment()` method.

Although each payment type uses the same method name, the behavior changes depending on the object type.

Example behavior:

- CreditCard → processes a credit card payment
- PayPal → processes a PayPal payment
- GiftCard → processes a gift card payment

This allows the system to call the same method while receiving different behavior based on the subclass instance.

---

### Automated Testing

Automated tests were implemented using **Mocha** and **Chai** to ensure the correctness of the payment hierarchy.

Tests verify:

- Base class validation behavior
- Subclass validation logic
- Edge cases for invalid inputs
- Correct inheritance behavior

Each test includes comments explaining why the test exists and how it contributes to system stability.

---

### Test Coverage

The following scenarios are tested:

1. Valid payment amount validation in the base class
2. Rejection of negative payment amounts
3. Credit card number validation
4. PayPal email validation
5. Gift card balance validation
6. Edge cases for invalid input values

These tests ensure that the payment system behaves correctly and prevents invalid transactions.

---

### Running Tests

Tests can be executed using the following command:

```
npm test
```

This command runs all test files located in the `tests` directory using Mocha.

Successful output will show all tests passing.

Example output:

```
8 passing
```

This confirms that the payment hierarchy functions correctly.

---

### Demo Interface

A responsive HTML demo page is included to demonstrate how the payment system works.

The demo page allows users to:

- Select a payment method
- Enter a payment amount
- Process the payment
- View the result dynamically

The demo uses the polymorphic payment classes to create the appropriate payment object and call the shared `processPayment()` method.

This provides a visual demonstration of polymorphism in action.

---

### Future Improvements

Possible future enhancements include:

- Adding additional payment methods
- Integrating real payment processing APIs
- Expanding validation rules
- Increasing automated test coverage

The current architecture makes it easy to extend the system by simply adding new subclasses that extend the base payment class.