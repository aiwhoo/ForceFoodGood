# RestaurantModel Unit Test Analysis (Elaine)


## Test 1 – Happy Path: Successfully Editing an Existing Review

**What is being tested?**  
- Verifies that `editReview()` correctly replaces an existing review at a valid index.

**Why this is important:**  
- Ensures users can successfully update reviews.
- Prevents stale or incorrect review data.

**Risk if this fails:**  
- Review edits may not save correctly.
- UI could display outdated information.

**Test Type:**  
- Happy Path / State Validation

**Benefit of this test:** 
- Ensures review updates work correctly.
- Prevents regressions in core editing functionality.

---

## Test 2 – Edge Case: Decimal Rating Calculation

**What is being tested?**  
- Verifies that `updateRating()` correctly calculates the average when reviews contain decimal star values.

**Why this is important:**  
- Ensures fractional ratings are handled accurately.
- Prevents incorrect averages in the UI.

**Risk if this fails:**  
- Ratings could be miscalculated.
- Users could see misleading average scores.

**Test Type:**  
- Edge Case / Boundary Condition

**Benefit of this test:** 
- Verifies accurate average calculations with fractional ratings.
- Prevents rounding or calculation errors.

---

## Test 3 – Failure Case: Invalid Index and Incorrect Object Type

**What is being tested?**  
- Verifies that `editReview()` properly throws errors when:
  - The index is invalid (negative or out-of-range).
  - The provided object is not a `RatingModel` instance.

**Why this is important:**  
- Protects data integrity.
- Prevents accidental corruption of the reviews array.

**Risk if this fails:**  
- Application may crash.
- Invalid objects could be inserted into the reviews array.

**Test Type:**  
- Error Handling / Input Validation

**Benefit of this test:** 
- Ensures invalid inputs are properly rejected.
- Protects the system from corrupted data.

---

## Test 4 – Behavior Validation: addReview() + updateRating()

**What is being tested?**  
- Confirms that after adding reviews and calling `updateRating()`, the restaurant's rating updates correctly.

**Why this is important:**  
- Ensures consistency between `addReview()` and `updateRating()`.
- Validates correct recalculation of averages when new data is added.

**Risk if this fails:**  
- Ratings may not reflect current reviews.
- Users could see outdated averages.

**Test Type:**  
- State Change / Behavior Validation

**Benefit of this test:** 
- Confirms ratings update correctly after adding new reviews.
- Ensures consistency between stored reviews and displayed rating.
