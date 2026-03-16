import PaymentModel from "./PaymentModel.js";

class CreditCard extends PaymentModel {

    constructor(amount, cardNumber) {
        super(amount);
        this.cardNumber = cardNumber;
    }

    // Override parent validation
    validate() {

        if (!super.validate()) return false;

        if (typeof this.cardNumber !== "string" || this.cardNumber.length !== 16) {
            return false;
        }

        return true;
    }

    // Polymorphic override
    processPayment() {
        return `Processed $${this.amount} using Credit Card`;
    }

}

export default CreditCard;