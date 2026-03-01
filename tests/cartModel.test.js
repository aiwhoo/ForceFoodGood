<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Mocha Tests - Cart</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://unpkg.com/mocha/mocha.css" />
    <!-- Load the Cart model like the other models -->
    <script src="../core/models/cartModel.js"></script>
</head>
<body>
<div id="mocha"></div>

<script src="https://unpkg.com/chai@4/chai.js"></script>
<script src="https://unpkg.com/mocha/mocha.js"></script>

<script class="mocha-init">
    mocha.setup("bdd");
    const expect = chai.expect;

    // Cart Model Tests
    describe("Cart Model Tests", function () {

        let cart;

        beforeEach(function () {
            cart = new Cart();
        });

        // Happy Path: Add a new item
        it("adds a new item correctly", function () {
            cart.addItem('Burger', 10, 2);
            expect(cart.items.length).to.equal(1);
            expect(cart.items[0].name).to.equal('Burger');
            expect(cart.items[0].price).to.equal(10);
            expect(cart.items[0].quantity).to.equal(2);
        });

        // Edge Case / Merge duplicate items
        it("updates quantity when adding an existing item", function () {
            cart.addItem('Burger', 10, 1);
            cart.addItem('Burger', 10, 3);
            expect(cart.items.length).to.equal(1);
            expect(cart.items[0].quantity).to.equal(4);
        });

        // Calculate total correctly
        it("calculates total correctly", function () {
            cart.addItem('Burger', 10, 2);
            cart.addItem('Fries', 5, 1);
            expect(cart.calculateTotal()).to.equal('25.00');
        });

        // State Change: Checkout clears cart
        it("clears all items after checkout", function () {
            cart.addItem('Burger', 10, 1);
            cart.addItem('Fries', 5, 1);
            cart.checkout();
            expect(cart.items.length).to.equal(0);
        });

    });
</script>

<script src="test.array.js"></script>
<script src="test.object.js"></script>
<script src="test.xhr.js"></script>
<script class="mocha-exec">
    mocha.run();
</script>

</body>
</html>
