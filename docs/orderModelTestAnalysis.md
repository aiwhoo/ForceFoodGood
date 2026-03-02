# Order System Test Documentation

This document explains the purpose and value of each test in the **Order System** test suite for the `OrderModel` class.

---

## Test 1: Updating Cost (Happy Path)

### What Is Being Tested
- How adding/removing menuItems affects totalCost
- If totalCost is properly updated

### Why It Is Important
This represents the normal user workflow:
1. Customer adds items.
2. System calculates total.
3. Customer removes an item.
4. System recalculates total.

If this fails, the primary functionality of the ordering system is broken.

### What Could Break If It Fails
- Customers may be charged incorrect amounts.
- Checkout totals may be inaccurate.
- Business revenue calculations may be wrong.
- Customer trust in the system may decrease.

### Benefits of Testing
- Confirms logic and user stories work correctly

### Type of Test
- Unit Test
- Happy Path Test
- State Change Test

---

## Test 2: Add Menu Item with Small Decimal Price (Edge Case)

### What Is Being Tested
- Handling of small decimal prices (`1.001`).
- Ensuring proper rounding or accurate cost calculation.

### Why It Is Important
Financial systems must handle decimal precision correctly.

Even small rounding errors can:
- Accumulate over many transactions.
- Cause accounting discrepancies.
- Create customer billing issues.
- User assumption that dollar amounts are limited to 0.00

### What Could Break If It Fails
- Floating-point precision errors.
- Incorrect totals shown at checkout.
- Financial inconsistencies.
- Customer disputes over pricing.

### Benefits of Testing
- Improves financial accuracy.
- Detects rounding bugs.
- Ensures predictable cost behavior.
- Identifies need for currency formatting logic.

### Type of Test
- Unit Test
- Edge Case Test
- Data Precision Test

---

## Test 3: Remove Menu Item That Does Not Exist (Invalid Input)

### What Is Being Tested
- Behavior when attempting to remove an item not in the order.
- System handling of invalid operations.

### Why It Is Important
Users or developers may attempt invalid operations.  
The system should:
- Fail gracefully
- Not corrupt internal state
- Not produce invalid totals

### What Could Break If It Fails
- Negative totals (as seen in the current implementation).
- Corrupted cart state.
- Runtime errors.
- Unexpected crashes.

### Benefits of Testing
- Identifies logic flaws.
- Improves robustness.
- Encourages defensive programming.
- Prevents data corruption.

### Type of Test
- Unit Test
- Negative Test
- Invalid Input Test

---

## Test 4: totalItems Updates on Add/Remove (State Change)

### What Is Being Tested
- `totalItems` reflects the correct number of items.
- System state updates after adding or removing items.

### Why It Is Important
The UI and business logic may rely on:
- Item count display
- Checkout validation
- Inventory tracking

If state does not update correctly, the UI and backend may become inconsistent.

### What Could Break If It Fails
- Cart icon shows wrong item count.
- Checkout allows empty orders.
- Backend and frontend state mismatch.
- Incorrect order summaries.

### Benefits of Testing
- Ensures state consistency.
- Validates internal data synchronization.
- Confirms accurate order tracking.
- Prevents subtle state bugs.

### Type of Test
- Unit Test
- State Change Test
- Behavioral Test

---

# Overall Value of This Test Suite

This suite ensures:

- Correct cost calculation
- Proper state transitions
- Edge case handling
- Invalid input detection
- Financial reliability

Together, these tests protect the core ordering functionality and improve overall system stability.