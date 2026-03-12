# ForceFoodGood – GrubHub Clone

ForceFoodGood is a simple GrubHub-style food ordering app we made to practice backend coding and object-oriented programming. It shows how a basic food delivery system works. Users can browse restaurants, add menu items to their order, and see the total price.

[![Node.js CI](https://github.com/aiwhoo/ForceFoodGood/actions/workflows/test.yml/badge.svg)](https://github.com/aiwhoo/ForceFoodGood/actions/workflows/test.yml)

### What the project includes:

* **User class** – stores user information and order history
* **Restaurant class** – manages restaurant details and menus
* **MenuItem class** – represents individual food items
* **Order System** – A multi-stage order pipeline (Cart -> Confirmed -> Past)

### What we are learning:

* How to use object-oriented programming (OOP) and inheritance
* How to organize backend logic and state transitions
* How to handle floating-point precision in financial calculations
* How to use GitHub professionally (issues, branches, pull requests, code reviews)

---

## Project Overview

This project demonstrates object-oriented programming in JavaScript, input validation, and professional Git workflow. Users can:

- Browse restaurants and menus
- Add or remove items from a shopping cart
- Apply promo codes and calculate real-time tax
- Checkout and see order confirmation
- Leave, edit, and view reviews

---

## Architecture Summary

### Core Models & Classes

- **OrderModel (Base)** – The foundation for all orders.
    - Tracks `username`, `restaurant`, `itemsOrdered`, and unique `id`.
    - Methods: `getTotalItems()`, `getCost()`, `summary()`.

- **CartOrderModel (Extends OrderModel)** – Manages the active shopping session.
    - Handles logic for `TAX` (10%) and `PROMO_DISCOUNT`.
    - `calculateTotal()`: Uses `Number.EPSILON` to ensure floating-point precision for subtotal, tax, and totals.
    - `addMenuItem(item)` / `removeMenuItem(item)`: Dynamically updates costs.

- **ConfirmedOrderModel (Extends OrderModel)** – Represents a finalized purchase.
    - Stores `paymentID` and `userAddress`.
    - Tracks delivery `status` (e.g., "Processing", "Confirmed").

- **PastOrderModel (Extends OrderModel)** – Archive of completed transactions.
    - Stores the historical `deliveryDate`.

- **RestaurantModel** – Stores restaurant information and reviews.
    - `addReview(review)`, `calculateAverageReviewRating()`.

- **Menu / MenuItemModel** – Manages the catalog of food.
    - `MenuItemModel` stores `name`, `price`, `description`, and `category`.

---

## Validation Rules

To ensure data integrity, the following rules are enforced:

### Restaurant & Menu
- **Name**: Must be a non-empty string.
- **Price**: Must be a number greater than 0.
- **Rating**: Must be a number between 1 and 5 (inclusive).

### Order & Cart
- **Order Integrity**: Must contain at least one valid menu item to checkout.
- **Quantity**: Must be a positive integer.
- **Checkout**: The cart is cleared after a successful transition to a `ConfirmedOrderModel`.

---

## Testing Guide

The project uses **Mocha** and **Chai** for unit testing, focusing on state changes and edge cases.

### Running Tests
1. Open terminal
2. Run: `npm test`
   *Note: You can also open the test HTML file in a browser to see results visually.*

### Key Test Coverage
- **State Changes**: Verifying a `CartOrderModel` correctly promotes to a `ConfirmedOrderModel`.
- **Edge Cases**: Handling duplicate items in the cart and ensuring removal logic works.
- **Precision**: Ensuring `16.042` correctly rounds for financial displays.

---

## Technical Implementation Notes

### Order Logic Flow
The frontend (`makeOrderPage.html`) interacts with `OrderLogicModel.js` to:
1. Instantiate a `CartOrderModel`.
2. Map internal item arrays to dynamic HTML elements.
3. Use the `summary()` method to provide human-readable status updates.
4. Disable UI elements once an order is confirmed to prevent double-billing.

### Future Improvements
- Add detailed tests for the UI rendering logic.
- Improve UI/UX for the cart and checkout transitions.
- Enable image uploads for restaurant reviews.

---

## Contribution Guidelines

1. Fork the repository.
2. Create a feature branch for your task.
3. Commit changes with clear, descriptive messages.
4. Push your branch to your fork and open a Pull Request.
5. Participate in TA code review.