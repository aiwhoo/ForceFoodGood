Cart Model Testing Analysis

Test 1: Adds a new item and calculates the total correctly
What is being tested?
  Adding a new item to an empty cart and verifying the total price is calculated correctly.
Why is this important?
  Ensures basic cart functionality works and the total is accurate for user billing.
What could break if this fails?
  Users may see incorrect totals, leading to overcharges or undercharges.
Type of test:
  Happy Path / Validation
Benefit of testing:
  Confirms core business logic for adding items and calculating totals, preventing silent failures.

Test 2: Updates quantity and state when adding an existing item
What is being tested?
  Adding the same item again increases its quantity instead of creating a duplicate entry.
Why is this important?
  Maintains accurate cart state and prevents duplicates that could confuse users or miscalculate totals.
What could break if this fails?
  Totals may be incorrect; inventory tracking could fail; users may be overcharged.
Type of test:
  State Change / Business Rule Enforcement
Benefit of testing:
  Ensures consistent behavior when users add multiple quantities of the same item.

Test 3: Should throw an error when checking out an empty cart
What is being tested?
  Attempting checkout with an empty cart raises an appropriate error message (Cannot checkout with an empty cart.).
Why is this important?
  Prevents invalid operations and enforces business rules.
What could break if this fails?
  Users could submit empty orders, corrupt order data, or cause system errors.
Type of test:
  Edge Case / Error Handling
Benefit of testing:
  Protects system integrity and improves user experience by preventing invalid actions.

Test 4: Should not allow negative quantities to result in a negative total
What is being tested?
  Adding an item with a negative quantity does not produce a negative total.
Why is this important?
  Prevents users from exploiting or accidentally creating negative totals.
What could break if this fails?
  Financial calculations could fail, causing negative charges or refund issues.
Type of test:
  Boundary Condition / Business Rule Enforcement
Benefit of testing:
  Protects business logic, enforces data integrity, and prevents financial errors.

Test 5: Clears all items after a successful internal checkout
What is being tested?
  After checkout, the cart is emptied and all item states are reset.
Why is this important?
  Ensures the cart does not retain old items for subsequent sessions, maintaining data consistency.
What could break if this fails?
  Users may see items from previous purchases, causing confusion or accidental double orders.
Type of test:
  State Change / Business Rule Enforcement
Benefit of testing:
  Ensures proper state transitions and reliability after checkout.



