# TEST 1
this test tests if removeMenuItem() correctly removes the menu item and recalculates the cost
# TEST 2
this tests is addMenuItem() works correctly and calculates the cost of all the items
# TEST 3
this tests if removeMenuItem() when the menu item was never added correctly identifies the price of the cart to be $0
# TEST 4
this provides an incorrect argument to the constructor of an array instead of a string to see if it produces an error


# Anish's tests
# Test 1
This is the happy-path test, and it checks if  cost is corrected correctly when multiple items are added. This tests the
cost functionality of the program, and if it didn't work, it would show that cost calculations may be wrong.
# Test 2
This is the edge-case test, which tests what happens when two duplicate items are present in the order list, and the
removeMenuItem() is called. This makes sure that even with duplicate items, removeMenuItem() only removes one, 
which ensures the functionality of that method. If this didn't work, it would indicate that removeMenuItem() is broken,
and cannot handle multiple similar MenuItem objects. 
# Test 3
This test (invalid case) checks to see what happens to price calculations if an object is added with no price. This makes 
sure that there is sufficient handling for faulty inputs, and if it didn't work, then it would indicate that there needs
to be efficient error throwing or calculation adjustments for these invalid cases. 
# Test 4
This test (state change) makes sure that even if an item is removed, the cost automatically calculates properly. This is
important to show that even when an item is removed, the state change occurs (price goes down). If this didn't work, it 
would indicate that the order list cannot properly handle these state changes, and also that the cost calculations need
to be adjusted. 
