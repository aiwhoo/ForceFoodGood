import { expect } from "chai";
import DriverMessage from "../core/models/messages/DrivermessageModel.js";

describe("DriverMessage Class", function(){

    it("formats driver message correctly", function(){

        let msg = new DriverMessage("Arriving soon","Customer","Luis")

        expect(msg.formatMessage()).to.equal("Driver Luis: Arriving soon")

    })

})
