
This command will execute all automated tests and display whether they pass or fail.

---

## What the Tests Cover

The tests verify that the main functionality of the system works correctly, including:

### Edge Cases
Tests ensure the system behaves correctly in boundary situations.  
Example: When no ratings exist, `getAverageRating()` should return `0` instead of causing an error.

### Invalid Inputs
Tests confirm that invalid data is handled properly.  
Example: Ratings outside the allowed range (such as below 1 or above 5) should be rejected.

### Aggregation Logic
Tests verify calculations involving multiple values.  
Examples include:
- `getAverageRating()`
- `getRatingCount()`

These tests ensure that averages and totals are calculated correctly.

---

## How Continuous Integration (CI) Works

This project uses **Continuous Integration (CI)** to automatically run tests when code is pushed to the repository.

### CI Workflow

1. A developer pushes code or opens a pull request on GitHub.
2. The CI pipeline automatically starts.
3. The system installs project dependencies.
4. All automated tests are executed.
5. If the tests pass, the code can be safely merged.
6. If any test fails, the developer must fix the issue before merging.

CI helps maintain code quality by automatically testing new changes and preventing broken code from being merged into the main branch.