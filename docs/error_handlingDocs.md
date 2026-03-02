# Error Handling — Issue #88

## Purpose
This project throws `Error` objects when an invalid action occurs. This prevents silent failures and makes debugging easier.

## Validation Strategy
A small helper is used:

- `assert(condition, message)`  
  Throws `new Error(message)` if the condition is false.

## What Throws Errors

### MenuItem
- Missing/blank `name`
- `price` not a finite number
- `price < 0`

### Restaurant
- Missing/blank `name` or `address`
- `rating` not in `[1, 5]`
- Duplicate menu item names blocked in `addMenuItem`
- Removing non-existent menu items blocked in `removeMenuItem`

### Cart
- Adding/removing requires a valid `MenuItem`
- Quantity must be `> 0`
- Cannot remove an item not in cart
- Cannot remove more than existing quantity
- `calculateTotal()` throws if cart has invalid data

### User.checkout()
- Cannot checkout with an empty cart

## Example
```js
try {
  user.cart.addItemToCart(burger, 0);
} catch (err) {
  console.log(err.message); // "Cart: quantity must be > 0."
}