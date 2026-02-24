# ForceFoodGood

ForceFoodGood is a GrubHub clone that allows users to browse restaurants, view menus, add items to a cart, leave reviews, and complete orders.

---

## Project Overview

This project demonstrates object-oriented programming in JavaScript, input validation, and professional Git workflow. Users can:

- Browse restaurants and menus
- Add or remove items from a shopping cart
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

- **Order** – Stores order information and status
    - Includes order ID counter and checkout status
-  **Menu** – Stores and manages menu items
    - `addItem(menuItem)` – Adds a new `MenuItemModel` to the menu
    - `removeItemByName(name)` – Removes a menu item by its name
    - `getAllItems()` – Returns all menu items
    - `getItemsByCategory(category)` – Returns all items in a specific category
    - `clearMenu()` – Removes all menu items from the menu
---

## Learning Goals

- Understand OOP concepts in JavaScript
- Implement input validation and error handling
- Write tests using Mocha and Chai
- Practice professional Git workflow with feature branches, commits, and PRs

---

## Features Implemented

- Dynamic rendering of menus and restaurants
- Cart functionality with quantity tracking
- Checkout and order confirmation
- Reviews with add/edit functionality
- Documentation updates, including class summary and contribution guidelines

---

## Contribution Guidelines

1. Fork the repository
2. Create a feature branch for your task
3. Commit changes with clear, descriptive messages
4. Push your branch to your fork and open a Pull Request
5. Participate in TA code review

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