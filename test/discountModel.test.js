import { expect } from 'chai';
import { 
    DiscountStrategy,
    PercentageDiscount, 
    FlatDiscount, 
    ConditionalDiscount 
} from "../core/models/discountModel.js";

// Mirroring the Cart structure because I can't change the original class, that is someone else's issue
// To ensures our tests focus strictly on the Discount logic.
const mockCart = (totalStr, itemsArray = []) => ({
    calculateTotal: () => totalStr,
    items: itemsArray
});

describe('DiscountStrategy Suite', () => {

    /**
     * Test Case 1: Validate Base Class Behavior (Failure Condition)
     * Why: Ensures the Parent class remains abstract and cannot be used directly.
     * Validation: Checks if calling apply() on the base class throws an error like it should.
     * Stability: Important because it prevents developers from accidentally instantiating a logic-less base class for discount.
     */
it('should throw an error when calling apply from the base class', () => {
    const baseStrategy = new DiscountStrategy();
    const mockCart = { calculateTotal: () => "100.00", items: [] };
    
    // We wrap the call in a function so Chai can "catch" the error
    expect(() => baseStrategy.apply(mockCart)).to.throw("Invalid input: Expected an instance of Cart.");
});

    /**
     * Test Case 2: Validate Subclass Override (Percentage Logic)
     * Why: Confirms that the strategy correctly parses the Cart's string total and applies math.
     * Validation: 20% of 200 should be exactly 40.
     * Stability: Important becuase it insures price calculations remain accurate across different numeric formats.
     */
    it('PercentageDiscount: should correctly calculate 20% of "200.00"', () => {
        const strategy = new PercentageDiscount(20);
        const result = strategy.apply(mockCart("200.00"));
        expect(result).to.equal(40.00);
    });

    /**
     * Test Case 3: Edge Case (Flat Discount exceeding Total)
     * Why: Validates the system doesn't allow "negative" totals or excessive discounts.
     * Validation: If discount is $100 but total is $50, discount should cap at $50.
     * Stability: Important because it protects the business from losing more money than the value of the transaction/disocunt being too high.
     */
    it('FlatDiscount: should not allow discount to exceed the cart total', () => {
        const strategy = new FlatDiscount(100);
        const result = strategy.apply(mockCart("50.00"));
        expect(result).to.equal(50.00);
    });

    /**
     * Test Case 4: Conditional Logic (Minimum Item Threshold)
     * Why: Tests the interaction between the strategy and the Cart's internal items array.
     * Validation: Discount should be 0 if items < threshold, and $10 if items >= threshold.
     * Stability: Important becuase it insures the logic for "Bulk Buy" discount is only triggered when criteria are met.
     */
    it('ConditionalDiscount: should only apply $10 discount if 3+ items exist', () => {
        const strategy = new ConditionalDiscount(3, 10.00);
        
        // Fail condition: only 2 items
        const failCart = mockCart("100.00", [{ quantity: 2 }]);
        expect(strategy.apply(failCart)).to.equal(0);

        // Pass condition: 3 items
        const passCart = mockCart("100.00", [{ quantity: 3 }]);
        expect(strategy.apply(passCart)).to.equal(10.00);
    });
});
