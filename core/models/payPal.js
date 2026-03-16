import PaymentModel from "./PaymentModel.js";

class PayPal extends PaymentModel {

    constructor(amount, email) {
        super(amount);
        this.email = email;
    }

    // Override parent validation
    validate() {

        if (!super.validate()) return false;

        if (typeof this.email !== "string" || !this.email.includes("@")) {
            return false;
        }

        return true;
    }

    // Polymorphic override
    processPayment() {
        return `Processed $${this.amount} using PayPal`;
    }

}

export default PayPal;