const { expect } = require("chai");

const {
    Promotion,
    PercentagePromotion,
    FlatPromotion,
    BuyOneGetOne
} = require("../core/models/promotionModel");

describe("Promotion Polymorphism Tests", () => {
    it("should throw an error when applyDiscount is called on the base Promotion class", () => {
        const promo = new Promotion("Base Promotion");
        expect(() => promo.applyDiscount(100)).to.throw("applyDiscount must be implemented by subclasses");
    });

    it("should apply a percentage discount correctly", () => {
        const promo = new PercentagePromotion(10);
        const result = promo.applyDiscount(100);
        expect(result).to.equal(90);
    });

    it("should apply a flat discount correctly", () => {
        const promo = new FlatPromotion(20);
        const result = promo.applyDiscount(100);
        expect(result).to.equal(80);
    });

    it("should not allow FlatPromotion to reduce total below zero", () => {
        const promo = new FlatPromotion(200);
        const result = promo.applyDiscount(100);
        expect(result).to.equal(0);
    });


});