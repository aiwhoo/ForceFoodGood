// Import the MenuItemModel class
const MenuItemModel = require('../models/menuItemModel');

// Create a new menu item (test object)
const item1 = new MenuItemModel(
    "Burger",
    8.99,
    "Beef burger with cheese",
    "Fast Food"
);

// Test the getter methods
console.log("Name:", item1.getName());
console.log("Price:", item1.getPrice());
console.log("Description:", item1.getDescription());
console.log("Category:", item1.getCategory());