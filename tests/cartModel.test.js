mocha.setup("bdd");
const expect = chai.expect;

describe("Cart Model Tests", function () {

    let cart;

    beforeEach(function () {
        cart = new Cart();
    });

    it("adds a new item correctly", function () {
        cart.addItem('Burger', 10, 2);
        expect(cart.items.length).to.equal(1);
        expect(cart.items[0].name).to.equal('Burger');
        expect(cart.items[0].price).to.equal(10);
        expect(cart.items[0].quantity).to.equal(2);
    });

    it("updates quantity when adding an existing item", function () {
        cart.addItem('Burger', 10, 1);
        cart.addItem('Burger', 10, 3);
        expect(cart.items.length).to.equal(1);
        expect(cart.items[0].quantity).to.equal(4);
    });

    it("calculates total correctly", function () {
        cart.addItem('Burger', 10, 2);
        cart.addItem('Fries', 5, 1);
        expect(cart.calculateTotal()).to.equal('25.00');
    });

    it("clears all items after checkout", function () {
        cart.addItem('Burger', 10, 1);
        cart.addItem('Fries', 5, 1);
        cart.checkout();
        expect(cart.items.length).to.equal(0);
    });

});
