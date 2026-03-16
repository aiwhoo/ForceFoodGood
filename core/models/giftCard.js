import PaymentModel from "./PaymentModel.js";

class GiftCard extends PaymentModel {

    constructor(amount, balance) {
        super(amount);
        this.balance = balance;
    }

    // Override parent validation
    validate() {

        if (!super.validate()) return false;

        if (typeof this.balance !== "number" || this.balance < this.amount) {
            return false;
        }

        return true;
    }

    // Polymorphic override
    processPayment() {
        return `Processed $${this.amount} using Gift Card`;
    }

}

export default GiftCard;