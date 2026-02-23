# Testing Guide

This guide explains how to run and write unit tests for the ForceFoodGood project.

## Testing Stack

- **[Mocha](https://mochajs.org/)** – test runner (BDD style with `describe` and `it`)
- **[Chai](https://www.chaijs.com/)** – assertion library (using the `expect` style)

Both libraries are loaded via CDN in `tests/tests.html`, so no installation is required.

---

## Running Tests

1. Open the `tests/tests.html` file in any modern web browser.
   - You can do this by double-clicking the file in your file explorer, or by opening it through your IDE's browser preview.
2. The Mocha test runner will execute all tests automatically and display the results on the page.
3. Passing tests appear in **green**. Failing tests appear in **red** with an error message explaining what went wrong.

---

## File Structure

```
ForceFoodGood/
├── core/
│   └── models/          ← source files being tested
│       ├── restaurantModel.js
│       ├── ratingsModel.js
│       └── menuModel.js
└── tests/
    └── tests.html       ← all unit tests live here
```

---

## Writing Unit Tests

All tests are written inside `tests/tests.html` in a `<script>` tag. Tests are grouped with `describe` blocks and individual test cases use `it` blocks.

### Basic Structure

```javascript
describe("Group Name", function() {
    it("describes what this test checks", function() {
        // arrange
        // act
        // assert
    });
});
```

### Using `expect` Assertions

The `expect` style from Chai reads like plain English:

```javascript
expect(someValue).to.equal(expectedValue);
expect(someArray.length).to.equal(3);
expect(someString).to.equal("hello");
```

### Common Assertions

| Assertion | Description |
|---|---|
| `.to.equal(val)` | Strict equality (`===`) |
| `.to.deep.equal(obj)` | Deep equality for objects/arrays |
| `.to.be.true` / `.to.be.false` | Boolean checks |
| `.to.be.null` | Null check |
| `.to.throw("message")` | Expects the function to throw an error |

### Example: Testing a Model Class

The example below tests the `MenuModel` class:

```javascript
describe("Menu System", function() {

    it("starts with zero items", function() {
        let menu = new MenuModel("Dinner Menu");
        expect(menu.getItems().length).to.equal(0);
    });

    it("can add an item to the menu", function() {
        let menu = new MenuModel("Dinner Menu");
        let item = new MenuItem("Burger", 9.99, "A juicy beef burger", "Mains");
        menu.addItem(item);
        expect(menu.getItems().length).to.equal(1);
    });

    it("throws an error for a negative price", function() {
        expect(() => new MenuItem("Bad Item", -1, "desc", "Mains"))
            .to.throw("Price must be 0 or greater");
    });

});
```

### Adding a New Test Group

1. Open `tests/tests.html`.
2. Locate the closing `</script>` tag of the main test block (just before `<script src="test.array.js">`).
3. Add your `describe` block inside the existing `<script class="mocha-init">` tag, after the last `describe` block.
4. Make sure the model file you are testing is loaded with a `<script>` tag in the `<head>` section.

```html
<!-- In the <head>, load your model -->
<script src="../core/models/yourModel.js"></script>
```

---

## Tips for Writing Good Tests

- **One assertion per test** – keep each `it` block focused on a single behavior.
- **Arrange, Act, Assert** – set up data, perform the action, then check the result.
- **Test edge cases** – zero items, invalid inputs, boundary values (e.g., stars = 0 and stars = 5).
- **Use descriptive names** – the `it` description should read like a sentence: *"throws an error when price is negative"*.
