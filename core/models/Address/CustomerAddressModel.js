// CustomerAddressModel.js
import AddressModel from './AddressModel.js';

class CustomerAddressModel extends AddressModel {
    constructor(street, city, state, zip, deliveryInstructions = "") {
        super(street, city, state, zip);
        this.deliveryInstructions = deliveryInstructions;
    }

    // Unique behavior: Validate ZIP format (e.g., exactly 5 digits)
    validateZip() {
        const zipRegex = /^\d{5}$/;
        return zipRegex.test(this.zip);
    }

    // Unique behavior: Format specifically for the delivery driver
    formatForDelivery() {
        let formattedStr = super.format();
        if (this.deliveryInstructions) {
            formattedStr += `\nDelivery Instructions: ${this.deliveryInstructions}`;
        }
        return formattedStr;
    }

    // POLYMORPHISM: Overriding the parent validate() method
    validate() {
        return super.validate() && this.validateZip();
    }

    // POLYMORPHISM: Overriding the parent format() method
    format() {
        // FIX APPLIED: Removed redundant super.format() && check
        return this.formatForDelivery();
    }
}

export default CustomerAddressModel;