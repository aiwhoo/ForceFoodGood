import { expect } from 'chai';

import PaymentModel from '../core/models/PaymentModel.js';
import CreditCard from '../core/models/creditCard.js';
import PayPal from '../core/models/payPal.js';
import GiftCard from '../core/models/giftCard.js';

describe("PaymentModel Base Class Validation", () => {

    // Why: Ensures the base payment class accepts valid payment amounts.
    // Importance: Prevents invalid transactions from entering the system.
    it("Should validate a correct payment amount", () => {

        const payment = new PaymentModel(50);

        expect(payment.validate()).to.be.true;

    });

    // Why: Edge case testing for invalid negative payment values.
    // Importance: Prevents financial errors such as negative transactions.
    it("Should fail validation for a negative payment amount", () => {

        const payment = new PaymentModel(-20);

        expect(payment.validate()).to.be.false;

    });

});

describe("CreditCard Subclass Logic", () => {

    // Why: Validates subclass specific credit card number validation.
    // Importance: Ensures invalid card numbers cannot be processed.
    it("Should validate a correct credit card number", () => {

        const card = new CreditCard(50, "1234567812345678");

        expect(card.validate()).to.be.true;

    });

    // Why: Edge case test for incorrect card length.
    // Importance: Prevents invalid credit card transactions.
    it("Should fail validation for invalid credit card number", () => {

        const card = new CreditCard(50, "123");

        expect(card.validate()).to.be.false;

    });

});

describe("PayPal Subclass Logic", () => {

    // Why: Ensures PayPal subclass validates correct email format.
    // Importance: Prevents invalid PayPal accounts from processing payments.
    it("Should validate a correct PayPal email", () => {

        const paypal = new PayPal(30, "user@email.com");

        expect(paypal.validate()).to.be.true;

    });

    // Why: Edge case testing for invalid email format.
    // Importance: Ensures system integrity by rejecting malformed emails.
    it("Should fail validation for invalid PayPal email", () => {

        const paypal = new PayPal(30, "invalidemail");

        expect(paypal.validate()).to.be.false;

    });

});

describe("GiftCard Subclass Logic", () => {

    // Why: Validates gift card balance logic.
    // Importance: Ensures users cannot spend more than the available gift card balance.
    it("Should process payment when sufficient balance exists", () => {

        const gift = new GiftCard(40, 100);

        expect(gift.validate()).to.be.true;

    });

    // Why: Edge case testing when balance is lower than payment amount.
    // Importance: Prevents overdrawing gift cards and causing financial discrepancies.
    it("Should fail validation when gift card balance is insufficient", () => {

        const gift = new GiftCard(100, 20);

        expect(gift.validate()).to.be.false;

    });

});