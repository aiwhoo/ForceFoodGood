import { expect } from 'chai';

import PaymentModel from '../core/models/PaymentModel.js';
import CreditCard from '../core/models/creditCard.js';
import PayPal from '../core/models/payPal.js';
import GiftCard from '../core/models/giftCard.js';

describe("PaymentModel Base Class Validation", () => {

    // Test 1
    it("Should validate a correct payment amount", () => {
        const payment = new PaymentModel(50);
        expect(payment.validate()).to.be.true;
    });

    // Test 2
    it("Should fail validation for a negative payment amount", () => {
        const payment = new PaymentModel(-20);
        expect(payment.validate()).to.be.false;
    });

    // Test 3
    it("Should fail validation for amount equal to zero", () => {
        const payment = new PaymentModel(0);
        expect(payment.validate()).to.be.false;
    });

    // Test 4
    it("Should fail validation when amount is not a number", () => {
        const payment = new PaymentModel("50");
        expect(payment.validate()).to.be.false;
    });

});

describe("CreditCard Subclass Logic", () => {

    // Test 5
    it("Should validate a correct credit card number", () => {
        const card = new CreditCard(50, "1234567812345678");
        expect(card.validate()).to.be.true;
    });

    // Test 6
    it("Should fail validation for invalid credit card number", () => {
        const card = new CreditCard(50, "123");
        expect(card.validate()).to.be.false;
    });

    // Test 7
    it("Should fail validation if amount is invalid", () => {
        const card = new CreditCard(-10, "1234567812345678");
        expect(card.validate()).to.be.false;
    });

    // Test 8
    it("Should return correct payment message", () => {
        const card = new CreditCard(30, "1234567812345678");
        expect(card.processPayment()).to.equal("Processed $30 using Credit Card");
    });

});

describe("PayPal Subclass Logic", () => {

    // Test 9
    it("Should validate a correct PayPal email", () => {
        const paypal = new PayPal(30, "user@email.com");
        expect(paypal.validate()).to.be.true;
    });

    // Test 10
    it("Should fail validation for invalid PayPal email", () => {
        const paypal = new PayPal(30, "invalidemail");
        expect(paypal.validate()).to.be.false;
    });

    // Test 11
    it("Should fail validation if amount is invalid", () => {
        const paypal = new PayPal(-5, "user@email.com");
        expect(paypal.validate()).to.be.false;
    });

    // Test 12
    it("Should return correct PayPal payment message", () => {
        const paypal = new PayPal(40, "user@email.com");
        expect(paypal.processPayment()).to.equal("Processed $40 using PayPal");
    });

});

describe("GiftCard Subclass Logic", () => {

    // Test 13
    it("Should process payment when sufficient balance exists", () => {
        const gift = new GiftCard(40, 100);
        expect(gift.validate()).to.be.true;
    });

    // Test 14
    it("Should fail validation when gift card balance is insufficient", () => {
        const gift = new GiftCard(100, 20);
        expect(gift.validate()).to.be.false;
    });

    // Test 15
    it("Should fail validation if amount is invalid", () => {
        const gift = new GiftCard(-10, 50);
        expect(gift.validate()).to.be.false;
    });

    // Test 16
    it("Should return correct Gift Card payment message", () => {
        const gift = new GiftCard(25, 100);
        expect(gift.processPayment()).to.equal("Processed $25 using Gift Card");
    });

});