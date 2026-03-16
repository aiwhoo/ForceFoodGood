import { expect } from 'chai';
import CustomerAddressModel from '../core/models/Address/CustomerAddressModel.js';

describe('CustomerAddressModel', () => {
    it('should pass base validation when all fields are present and zip is exactly 5 digits', () => {
        const customerLoc = new CustomerAddressModel("123 Main St", "Bear", "DE", "19701", "Leave at door");
        expect(customerLoc.validate()).to.be.true;
    });

    it('should override format() to append delivery instructions', () => {
        const customerLoc = new CustomerAddressModel("123 Main St", "Bear", "DE", "19701", "Leave at door");
        const formatted = customerLoc.format();
        expect(formatted).to.include("123 Main St, Bear, DE 19701");
        expect(formatted).to.include("Delivery Instructions: Leave at door");
    });

    it('should format normally without appending "undefined" if no delivery instructions are provided', () => {
        const customerLoc = new CustomerAddressModel("123 Main St", "Bear", "DE", "19701");
        const formatted = customerLoc.format();
        expect(formatted).to.equal("123 Main St, Bear, DE 19701");
        expect(formatted).to.not.include("Delivery Instructions:");
    });

    it('should fail validation if the ZIP code is not exactly 5 digits', () => {
        const shortZipLoc = new CustomerAddressModel("123 Main St", "Bear", "DE", "1970", "Leave at door");
        const letterZipLoc = new CustomerAddressModel("123 Main St", "Bear", "DE", "197OA", "Leave at door");

        expect(shortZipLoc.validate()).to.be.false;
        expect(letterZipLoc.validate()).to.be.false;
    });
});