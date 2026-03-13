# ForceFoodGood – GrubHub Clone

ForceFoodGood is a simple GrubHub-style food ordering app we made to practice backend coding and object-oriented programming. It shows how a basic food delivery system works. Users can browse restaurants, add menu items to their order, and see the total price.

[![Node.js CI](https://github.com/aiwhoo/ForceFoodGood/actions/workflows/test.yml/badge.svg)](https://github.com/aiwhoo/ForceFoodGood/actions/workflows/test.yml)

### What the project includes:

* User class – stores user information and order history
* Restaurant class – manages restaurant details and menus
* MenuItem class – represents individual food items
* Order class – keeps track of items ordered and calculates total cost

### What we are learning:

* How to use object-oriented programming (OOP)
* How to organize backend logic
* How food ordering systems work
* How to use GitHub professionally (issues, branches, pull requests, code reviews)

This project helps us practice writing cleaner code and working in a team environment.
# ForceFoodGood

ForceFoodGood is a GrubHub clone that allows users to browse restaurants, view menus, add items to a cart, leave reviews, and complete orders.

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

### Classes

- **RestaurantModel** – Stores restaurant information and reviews
    - `addReview(review)` – Adds a new review
    - `editReview(index, updatedReview)` – Updates an existing review
    - `calculateAverageReviewRating()` – Returns average stars
    - `getName()` / `setName()` – Get/set restaurant name
    - `getAddress()` / `setAddress()` – Get/set restaurant address

- **RatingModel** – Stores individual reviews
    - Properties: `stars`, `username`, `date`, `review`

- **MenuItemModel** – Stores menu items
    - Properties: `name`, `price`

- **Cart** – Manages items added by the user
    - Methods: `addItemToCart()`, `removeItemFromCart()`
    - Tracks quantity, total price, and prevents negative values

- **User** – Stores user information (email, name, GitHub handle)
- 
    - Includes order ID counter and checkout status
-  **Menu** – Stores and manages menu items
    - `addItem(menuItem)` – Adds a new `MenuItemModel` to the menu
    - `removeItemByName(name)` – Removes a menu item by its name
    - `getAllItems()` – Returns all menu items
    - `getItemsByCategory(category)` – Returns all items in a specific category
    - `clearMenu()` – Removes all menu items from the menu

- **AuthProvider** - Allows authentication by email, password and token
    - Subclasses: `EmailAuth`, `OAuthProvider`, `TwoFactorAuth`
    read /docs/authProvider.md for more info

---

## Learning Goals

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

## Notes / Future Improvements

- Add detailed tests for all classes
- Improve UI/UX for cart and checkout
- Enable image uploads for reviews

### FAQS
#### What is this project?
This project is a simple GrubHub clone built in JavaScript. 
It includes models for restaurants and ratings, along with basic tests using Mocha and Chai.


#### How do I run the tests?
Open the test HTML file in a browser.
The test results will display on the page.


#### What models are included?
- `RestaurantModel` – Stores restaurant name, address, and reviews.
- `RatingModel` – Stores review data including stars, username, date, and an optional review.
- `MenuItemModel` (if implemented) – Represents a menu item with name, price, description, and category.
- `UserModel` (if implemented) - Represents a user with ID, name, and email.
- `menuModel` - Stores and manages menu items, and allows for addition/removal/retrieval

## Validation Rules
To ensure data integrity and prevent invalid inputs, the following validation rules are enforced in the application.
### Restaurant Validation
- Name
  - Must not be empty
  - must be a string

### Menu validation
- Name
    - Must not be empty
    - Must be a string

- Price
    - Must be a number.
    - Must be greater than 0.
    - Negative or zero values are not allowed.

- Rating
    - Must be a number.
    - Must be between 1 and 5 (inclusive).

### Order Validation
- An order must contain at least one valid menu item
- Quantity must be a positive integer

### Cart Validation
- The cart cannot proceed to checkout if it is empty
- After successful checkout, the cart is cleared
## Testing Guide

The project uses **Mocha** and **Chai** for unit testing, focusing on state changes and edge cases.

### Running Tests
1. Open terminal
2. Run:
npm test
### How to write tests
- Go to tests folder  
- Create file like:
MenuItemModel.test.js
- Example:
const item = new MenuItemModel("Burger", 8.99);

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