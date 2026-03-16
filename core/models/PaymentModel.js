class PaymentModel {

    constructor(amount) {
        this.amount = amount;
    }

    // Base validation shared by all payment methods
    validate() {

        if (typeof this.amount !== "number" || this.amount <= 0) {
            return false;
        }

        return true;
    }

    // Method meant to be overridden by subclasses
    processPayment() {
        return `Processing payment of $${this.amount}`;
    }

}

export default PaymentModel;