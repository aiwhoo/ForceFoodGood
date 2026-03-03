# ratingsModel Test Analysis

## Test 1: Happy Path - Valid Rating
- **What is being tested:** Creating a rating with valid stars (3) and a username ("Andy").
- **Why it is important:** Ensures that the model correctly stores ratings when valid input is provided.
- **What could break if this fails:** Ratings may not be saved or displayed correctly in the UI, causing user confusion.
- **Type of test:** Happy path / Validation
- **Benefit of testing:** Confirms basic functionality works as intended and prevents regressions.

---

## Test 2: Edge Case - Boundary Ratings
- **What is being tested:** Creating ratings at the boundary values (0 and 5 stars).
- **Why it is important:** Verifies that the model handles minimum and maximum star values correctly.
- **What could break if this fails:** Ratings at the extremes could be rejected or mishandled, corrupting data or breaking calculations.
- **Type of test:** Edge case / Boundary condition
- **Benefit of testing:** Protects against invalid input at boundaries and ensures business rules are enforced.

---

## Test 3: Invalid Input - Out of Range Stars
- **What is being tested:** Creating ratings with invalid stars (-1 and 6).
- **Why it is important:** Prevents invalid ratings from being stored, which could corrupt averages or reports.
- **What could break if this fails:** Users may see incorrect ratings, and the system could calculate wrong averages or throw unexpected errors.
- **Type of test:** Error handling / Validation
- **Benefit of testing:** Ensures the model rejects bad input and maintains data integrity.

---

## Test 4: Correct Storage of All Properties
- **What is being tested:** Verifying that all properties (`stars`, `username`, `date`, `review`) are correctly stored in the model.
- **Why it is important:** Confirms that the rating object contains all necessary information for display and calculations.
- **What could break if this fails:** Missing or incorrect data could lead to broken UI, inaccurate reports, or loss of user trust.
- **Type of test:** Business rule enforcement / State verification
- **Benefit of testing:** Protects business logic, ensures reliability, and documents expected behavior.