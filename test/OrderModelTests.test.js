import { expect } from 'chai';
import OrderModel from "../core/models/orders/OrderModel.js"
import CartOrderModel from "../core/models/orders/CartOrderModel.js";
import MenuItemModel from "../core/models/menuItemModel.js";
import ConfirmedOrderModel from "../core/models/orders/ConfirmedOrderModel.js";
import PastOrderModel from "../core/models/orders/PastOrderModel.js";

describe('OrderModelTests', () => {


    let promoCodes = {"50% OFF": 0.5, "20% OFF" : 0.2};
    let pizza = new MenuItemModel("Pizza", 1, "idk", "pizza")
    let cake = new MenuItemModel("Cake", 10.999, "idk", "cake")
    let falafel = new MenuItemModel("Falafel", 5.042, "falafel")

    it("OrderModels should be created", () => {
        const order1 = new OrderModel("Pascal",null,1);
        expect(order1).to.not.be.undefined;
    })
    it("CartOrderModels should update correctly when given a new menuItem (happy path)", () => {
        const order1 = new OrderModel("Pascal",null,1);
        const cartOrder1 = new CartOrderModel(order1, "50% OFF", null, promoCodes);
        cartOrder1.addMenuItem(pizza);
        expect(cartOrder1.subtotal).to.equal(.5);
        expect(cartOrder1.totalCost).to.equal((0.5)*1.1);
        expect(cartOrder1.getTotalItems()).to.equal(1);
        expect(cartOrder1.lastModified).to.be.a('string');
        expect(Date.parse(cartOrder1.lastModified)).to.not.be.NaN;
    })
    it("CartOrderModel to ConfirmedOrderModel (state change)", () =>{
        const order2 = new OrderModel("Atticus",null,2);
        const cartOrder2 = new CartOrderModel(order2, null, null, promoCodes);
        cartOrder2.addMenuItem(pizza);
        const confirmedOrder1 = new ConfirmedOrderModel(cartOrder2, "Payment ID", "123 street");
        expect(confirmedOrder1.getCost()).to.equal(1.1);
        expect(cartOrder2.getCost()).to.equal(1.1);
        expect(cartOrder2.getId()).to.equal(2);
        expect(confirmedOrder1.getId()).to.equal(2);
        expect(confirmedOrder1.getTotalItems()).to.equal(cartOrder2.getTotalItems());
        expect(confirmedOrder1.getItems()[0].name).to.equal("Pizza");
    })
    it("Handling duped items (edge case)", () =>{
        const order3 = new OrderModel("Oesew",null,3);
        const cartOrder3 = new CartOrderModel(order3, null, null, promoCodes);
        cartOrder3.addMenuItem(pizza);
        cartOrder3.addMenuItem(pizza);
        expect(cartOrder3.getTotalItems()).to.equal(2);
        expect(cartOrder3.getCost()).to.equal(2.2);
        cartOrder3.removeMenuItem(pizza);
        expect(cartOrder3.getTotalItems()).to.equal(1);
        expect(cartOrder3.getCost()).to.equal(1.1);
    })

    it("Floating point precision", () =>{
        const order4 = new OrderModel("Sally",null,4);
        const cartOrder4 = new CartOrderModel(order4, null, null, promoCodes);
        cartOrder4.addMenuItem(cake);
        cartOrder4.addMenuItem(falafel);
        expect(cartOrder4.subtotal).to.equal(16.04);
    })
    it("Past Order Logging", () => {
        const order5 = new OrderModel("Pizza", null, 5);
        const pastOrder = new PastOrderModel(order5, "3/13/2026");
        pastOrder.status = "Delivered";
        expect(pastOrder.getDeliveryDate()).to.equal("3/13/2026");
        expect(pastOrder.summary()).to.equal("Order 5 for Pizza\n" +
            "[DELIVERED] Status: Delivered - Delivered on 3/13/2026");
    })


})