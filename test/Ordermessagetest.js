import { expect } from "chai";
import OrderMessage from "../core/models/messages/OrdermessageModel.js";

describe("OrderMessage Class", function(){

    it("formats order message correctly", function(){

        let msg = new OrderMessage("Food ready","Customer",101)

        expect(msg.formatMessage()).to.equal("Order #101: Food ready")

    })

})
