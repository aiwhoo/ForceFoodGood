// ===== Issue #88: Basic error handling using throw =====

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

function isFiniteNumber(n) {
    return typeof n === "number" && Number.isFinite(n);
}

// ----- Models -----

class MenuItem {
    constructor(name, price) {
        assert(typeof name === "string" && name.trim().length > 0, "MenuItem: name is required.");
        assert(isFiniteNumber(price), "MenuItem: price must be a number.");
        assert(price >= 0, "MenuItem: price cannot be negative.");
        this.name = name.trim();
        this.price = price;
    }
}

class Restaurant {
    constructor(name, address, rating = 5) {
        assert(typeof name === "string" && name.trim().length > 0, "Restaurant: name is required.");
        assert(typeof address === "string" && address.trim().length > 0, "Restaurant: address is required.");
        assert(isFiniteNumber(rating), "Restaurant: rating must be a number.");
        assert(rating >= 1 && rating <= 5, "Restaurant: rating must be between 1 and 5.");

        this.name = name.trim();
        this.address = address.trim();
        this.rating = rating;
        this.menu = [];
    }

    addMenuItem(menuItem) {
        assert(menuItem instanceof MenuItem, "Restaurant: addMenuItem requires a MenuItem.");
        const exists = this.menu.some((m) => m.name === menuItem.name);
        assert(!exists, `Restaurant: menu item '${menuItem.name}' already exists.`);
        this.menu.push(menuItem);
    }

    removeMenuItem(itemName) {
        assert(typeof itemName === "string" && itemName.trim().length > 0, "Restaurant: itemName is required.");
        const idx = this.menu.findIndex((m) => m.name === itemName.trim());
        assert(idx !== -1, `Restaurant: menu item '${itemName.trim()}' not found.`);
        this.menu.splice(idx, 1);
    }

    updateRating(newRating) {
        assert(isFiniteNumber(newRating), "Restaurant: rating must be a number.");
        assert(newRating >= 1 && newRating <= 5, "Restaurant: rating must be between 1 and 5.");
        this.rating = newRating;
    }
}

class Cart {
    constructor() {
        this.items = []; // [{ item: MenuItem, quantity: number }]
    }

    addItemToCart(menuItem, quantity = 1) {
        assert(menuItem instanceof MenuItem, "Cart: addItemToCart requires a MenuItem.");
        assert(isFiniteNumber(quantity) && quantity > 0, "Cart: quantity must be > 0.");

        const existing = this.items.find((x) => x.item.name === menuItem.name);
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({ item: menuItem, quantity });
        }
    }

    removeItemFromCart(menuItem, quantity = 1) {
        assert(menuItem instanceof MenuItem, "Cart: removeItemFromCart requires a MenuItem.");
        assert(isFiniteNumber(quantity) && quantity > 0, "Cart: quantity must be > 0.");

        const existing = this.items.find((x) => x.item.name === menuItem.name);
        assert(existing, `Cart: '${menuItem.name}' is not in the cart.`);

        existing.quantity -= quantity;
        assert(existing.quantity >= 0, "Cart: cannot remove more than existing quantity.");

        if (existing.quantity === 0) {
            this.items = this.items.filter((x) => x.item.name !== menuItem.name);
        }
    }

    calculateTotal() {
        return this.items.reduce((sum, entry) => {
            assert(entry.item instanceof MenuItem, "Cart: invalid item in cart.");
            assert(isFiniteNumber(entry.quantity) && entry.quantity > 0, "Cart: invalid quantity in cart.");
            return sum + entry.item.price * entry.quantity;
        }, 0);
    }

    clear() {
        this.items = [];
    }
}

class Order {
    static nextId = 1;

    constructor(items, total) {
        assert(Array.isArray(items), "Order: items must be an array.");
        assert(items.length > 0, "Order: cannot create an order with no items.");
        assert(isFiniteNumber(total) && total >= 0, "Order: total must be a valid number.");

        this.id = Order.nextId++;
        this.items = items;
        this.total = total;
        this.status = "pending";
    }

    updateStatus(newStatus) {
        const allowed = ["pending", "preparing", "delivered"];
        assert(allowed.includes(newStatus), `Order: status must be one of ${allowed.join(", ")}.`);
        this.status = newStatus;
    }
}

class User {
    constructor(name, email) {
        assert(typeof name === "string" && name.trim().length > 0, "User: name is required.");
        assert(typeof email === "string" && email.includes("@"), "User: email must look like an email address.");
        this.name = name.trim();
        this.email = email.trim();
        this.cart = new Cart();
        this.orders = [];
    }

    checkout() {
        assert(this.cart.items.length > 0, "User: cannot checkout with an empty cart.");
        const total = this.cart.calculateTotal();
        const order = new Order([...this.cart.items], total);
        this.orders.push(order);
        this.cart.clear();
        return order;
    }
}

// ===== Quick demo (optional) =====
// Comment this out if your repo already has its own demo code.
/*
const r = new Restaurant("Test Eats", "123 Main St", 5);
const burger = new MenuItem("Burger", 9.99);
r.addMenuItem(burger);

const u = new User("Tushar", "tushar@example.com");
u.cart.addItemToCart(burger, 2);
console.log("Total:", u.cart.calculateTotal());
console.log("Order:", u.checkout());
*/