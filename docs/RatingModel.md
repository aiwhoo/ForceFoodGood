
---

# Ratings Model Test Analysis

## ratingsModel Basic Unit Tests

### Test 1: Create a rating with valid inputs

**A. What is being tested?**
Checks that a `RatingModel` object is correctly created when provided valid stars, username, date, and review text.

**B. Why is this important?**
Ensures that the model correctly stores all properties when valid data is used, which is essential for tracking and displaying user reviews.

**C. What could break if this fails?**
Reviews may not save correctly, resulting in missing or incorrect data in the application UI.

**D. What type of test is this?**
State change / Object creation

**E. What is the benefit of testing this?**
Verifies that the constructor behaves as expected, preventing regressions in object creation logic.

---

### Test 2: Allow 0 stars as a valid rating

**A. What is being tested?**
Validates that a rating of `0` stars is accepted and stored correctly.

**B. Why is this important?**
Some users may want to give the lowest possible rating. The system must allow 0 without errors.

**C. What could break if this fails?**
Zero-star reviews could throw errors or be rejected, causing incomplete review data and inaccurate average ratings.

**D. What type of test is this?**
Boundary condition

**E. What is the benefit of testing this?**
Ensures all valid star values, including the edge case of 0, are supported. Protects against regressions.

---

### Test 3: Throw error if stars are greater than 5

**A. What is being tested?**
Confirms that the constructor throws an error when a star rating above the allowed maximum (5) is provided.

**B. Why is this important?**
Prevents invalid review data that could skew averages or break UI components that display ratings.

**C. What could break if this fails?**
Users could submit impossible ratings (like 6 stars), causing logic errors in rating calculations and potentially displaying invalid stars in the UI.

**D. What type of test is this?**
Validation / Error handling

**E. What is the benefit of testing this?**
Protects business rules and maintains data integrity. Prevents regressions where invalid ratings are accepted.

---

### Test 4: Store the date correctly

**A. What is being tested?**
Checks that the date property is correctly stored when creating a `RatingModel` object.

**B. Why is this important?**
Dates are used for sorting and displaying reviews chronologically. Correct storage is critical for accurate timelines.

**C. What could break if this fails?**
Reviews could appear out of order or have incorrect timestamps, confusing users and making the system unreliable.

**D. What type of test is this?**
State change

**E. What is the benefit of testing this?**
Ensures review data is reliable and chronological displays work correctly.

---

