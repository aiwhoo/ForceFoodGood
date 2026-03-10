import { expect } from 'chai';
import OrderModel from "../core/models/orders/OrderModel.js"

describe('OrderModel', () => {
    const order1 = new OrderModel("Pascal",null,1);
    const order2 = new OrderModel("Atticus",null,2);
    const order3 = new OrderModel("Sally",null,3);

    it("OrderModels should be created", () => {
        expect(order1).to.not.be.undefined;
        expect(order2).to.not.be.undefined;
        expect(order3).to.not.be.undefined;
    })
})