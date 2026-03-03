# menuItemModel Test Analysis

## Test 1 – Constructor Returns Correct Price

**What is being tested?**  
This test verifies that the constructor correctly stores the price and that `getPrice()` returns the expected value.

**Why is this important?**  
Menu pricing is a core business rule. Incorrect prices would cause incorrect totals during ordering.

**What could break if this fails?**  
Customers could see incorrect prices or totals when placing an order.

**Test Type**  
Business rule validation

**Benefit of testing**  
Ensures pricing data is stored and retrieved correctly.


---

## Test 2 – Edge Case: String Price

**What is being tested?**  
This test checks how the model behaves when a string value is used for price.

**Why is this important?**  
User input or API data may contain incorrect types.

**What could break if this fails?**  
Calculations involving price could behave unpredictably.

**Test Type**  
Edge case / boundary test

**Benefit of testing**  
Highlights potential validation gaps in the system.


---

## Test 3 – Negative Price Input

**What is being tested?**  
This test verifies how the model behaves when a negative price is passed.

**Why is this important?**  
Negative pricing should generally not be allowed in an ordering system.

**What could break if this fails?**  
Orders could display incorrect totals or allow invalid menu items.

**Test Type**  
Invalid input validation

**Benefit of testing**  
Reveals potential business logic vulnerabilities.


---

## Test 4 – State Change Validation

**What is being tested?**  
This test confirms that the `getPrice()` method reflects changes when the underlying price property is updated.

**Why is this important?**  
Models should accurately reflect their current state.

**What could break if this fails?**  
UI or order calculations may display outdated values.

**Test Type**  
State change / behavior validation

**Benefit of testing**  
Ensures the model stays consistent when data changes.