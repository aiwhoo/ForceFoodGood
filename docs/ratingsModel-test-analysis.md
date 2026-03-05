RatingModel Test Analysis
1. Valid Rating Creation (Happy Path)
   A. What is being tested?
   Creates a rating with valid inputs.

B. Why is this important?
Ensures normal functionality works correctly.

C. What could break if this fails?
Users may be unable to submit reviews.

D. Type of test:
Validation

2. Boundary Values (0 and 5)
   A. What is being tested?
   Accepts ratings at the limits (0 and 5).

B. Why is this important?
Confirms correct handling of edge values.

C. What could break if this fails?
Valid ratings could be rejected.

D. Type of test:
Boundary condition

3. Invalid Input (Out of Range)
   A. What is being tested?
   Rejects ratings below 0 or above 5.

B. Why is this important?
Prevents invalid data from entering the system.

C. What could break if this fails?
Incorrect averages or system errors.

D. Type of test:
Error handling

4. Property Assignment (State Test)
   A. What is being tested?
   Stores all provided values correctly.

B. Why is this important?
Ensures data integrity in the model.

C. What could break if this fails?
Incorrect or missing review data.

D. Type of test:
State change