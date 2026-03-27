import { expect } from "chai";
import Message from "../core/models/messages/messageModel.js";

describe("Message Class", function(){

    it("stores content and recipient", function(){

        let msg = new Message("Hello","User")

        expect(msg.content).to.equal("Hello")
        expect(msg.recipient).to.equal("User")

    })

})
