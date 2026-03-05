import {expect} from 'chai';
import UserModel from "../core/models/users/userModel.js";

describe("UserModelInstantiation", function() {
    it("exhibits firstname last name", function(){
        let user1 = new UserModel("userid1", "David", "Safro", "anish@udel.edu");
        //let customer2 = new CustomerUserModel();
        expect(user1.getFirstName()).to.equal("David");
    })
})