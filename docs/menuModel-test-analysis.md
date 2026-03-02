# Menu System – Test Analysis

## 1. Constructor initializes with empty items and default restaurant name

### A. What is being tested?
Validates that a new `Menu` instance starts with an empty `items` array and defaults the restaurant name to `"NO RESTAURANT"` when none is provided.

### B. Why is this important?
A predictable initial state ensures that all menu operations behave consistently and prevents hidden state bugs from appearing later.

### C. What could break if this fails?
Menus may begin with unexpected items or incorrect restaurant names, causing incorrect UI displays or corrupting menu data across the system.

### D. What type of test is this?
State initialization / baseline validation.

### E. What is the benefit of testing this?
Prevents regressions in constructor logic and documents the intended default behavior.

---

## 2. addItem() successfully adds a valid MenuItemModel

### A. What is being tested?
Checks that `addItem()` accepts a valid `MenuItemModel` instance and stores it in the menu.

### B. Why is this important?
Adding items is the core function of the menu system; if this fails, the menu becomes unusable.

### C. What could break if this fails?
Menu displays may appear empty, orders may be missing items, and any system relying on menu data could malfunction.

### D. What type of test is this?
State change / business rule enforcement.

### E. What is the benefit of testing this?
Ensures correct behavior under normal usage and prevents silent failures that could propagate through the system.

---

## 3. addItem() throws when adding a non‑MenuItemModel

### A. What is being tested?
Ensures that `addItem()` rejects invalid inputs and throws the correct error message when the argument is not a `MenuItemModel`.

### B. Why is this important?
Strict type safety prevents corrupted or malformed menu data from entering the system.

### C. What could break if this fails?
Invalid objects could be added to the menu, causing runtime errors when other methods expect real `MenuItemModel` instances.

### D. What type of test is this?
Error handling / input validation.

### E. What is the benefit of testing this?
Protects data integrity and clearly documents the expected error behavior for developers.

---

## 4. removeItemByName() removes an item by name

### A. What is being tested?
Verifies that `removeItemByName()` correctly removes items whose `getName()` matches the provided name.

### B. Why is this important?
Removing items is essential for updating menus, handling seasonal changes, and maintaining accurate offerings.

### C. What could break if this fails?
Outdated or incorrect items may remain visible to customers, leading to confusion, incorrect orders, or inconsistent menu displays.

### D. What type of test is this?
State change / business rule enforcement.

### E. What is the benefit of testing this?
Ensures predictable menu updates and prevents stale or incorrect data from persisting.

---

## 5. getItemsByCategory() returns only matching items

### A. What is being tested?
Validates that category filtering returns only items whose category matches the requested one.

### B. Why is this important?
Category filtering is used in UI sections (e.g., “Mains”, “Sides”) and for organizing menu data logically.

### C. What could break if this fails?
Customers may see incorrect items in categories, leading to confusion or incorrect ordering behavior.

### D. What type of test is this?
Business rule enforcement / functional filtering.

### E. What is the benefit of testing this?
Ensures reliable menu organization and prevents regressions in filtering logic.

