import { expect } from "chai";
import SystemMessage from "../core/models/messages/SystemmessageModel.js";

describe("SystemMessage Class", function(){

    it("formats system message correctly", function(){

        let msg = new SystemMessage("Maintenance tonight","Admin","WARNING")

        expect(msg.formatMessage()).to.equal("[SYSTEM WARNING] Maintenance tonight")

    })

})
