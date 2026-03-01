<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Mocha Tests</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Mocha CSS for test output -->
    <link rel="stylesheet" href="https://unpkg.com/mocha/mocha.css" />
</head>
<body>
    <div id="mocha"></div>

    <!-- Mocha and Chai JS for testing -->
    <script src="https://unpkg.com/mocha/mocha.js"></script>
    <script src="https://unpkg.com/chai@4/chai.js"></script>

    <!-- Your original tests, inside a module so imports work -->
    <script type="module">
        // Set up Mocha
        mocha.setup("bdd");

        // Use Chai expect
        const expect = chai.expect;

        // Import Cart from your module
        import Cart from '../core/models/cartModel.js';

        // Your tests remain unchanged
        describe('Cart Model Tests', () => {

            let cart;

            beforeEach(() => {
                cart = new Cart();
            });

            it('adds a new item correctly', () => {
                cart.addItem('Burger', 10, 2);
                expect(cart.items.length).to.equal(1);
                expect(cart.items[0].name).to.equal('Burger');
                expect(cart.items[0].price).to.equal(10);
                expect(cart.items[0].quantity).to.equal(2);
            });

            it('updates quantity when adding an existing item', () => {
                cart.addItem('Burger', 10, 1);
                cart.addItem('Burger', 10, 3);
                expect(cart.items.length).to.equal(1);
                expect(cart.items[0].quantity).to.equal(4);
            });

            it('calculates total correctly', () => {
                cart.addItem('Burger', 10, 2);
                cart.addItem('Fries', 5, 1);
                const total = cart.calculateTotal();
                expect(total).to.equal('25.00');
            });

            it('clears all items after checkout', () => {
                cart.addItem('Burger', 10, 1);
                cart.addItem('Fries', 5, 1);
                cart.checkout();
                expect(cart.items.length).to.equal(0);
            });

        });

        // Run Mocha in the browser
        mocha.run();
    </script>
</body>
</html>
