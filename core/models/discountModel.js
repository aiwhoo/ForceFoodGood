/**
 * Parent Class: DiscountStrategy
 * Description: Base class for the strategy pattern.
 * Provides centralized validation for all discount subclasses.
 */
export class DiscountStrategy {
    /**
     * @param {Object} cart - The cart object to validate.
     */
    apply(cart) {
        // 1. Validation Logic: This must come FIRST.
        // It ensures the input exists and has the necessary calculateTotal method.
        // This satisfies tests checking for 'Invalid input: Expected an instance of Cart.'
        if (!cart || typeof cart.calculateTotal !== 'function') {
            throw new Error("Invalid input: Expected an instance of Cart.");
        }

        // 2. Base Class Restriction: This comes SECOND.
        // Ensures that the base class cannot be used directly as a strategy.
        // This satisfies tests checking that the base class throws 'Method must be implemented'.
        if (this.constructor === DiscountStrategy) {
            throw new Error("Method 'apply()' must be implemented by subclass.");
        }
    }
}

/**
 * Subclass: PercentageDiscount
 * Behavior: Calculates a percentage of the cart total.
 */
export class PercentageDiscount extends DiscountStrategy {
    constructor(percent) {
        super();
        this.percent = percent;
    }

    apply(cart) {
        // Calls parent validation. Passes the constructor check because 'this' is PercentageDiscount.
        super.apply(cart);

        const total = parseFloat(cart.calculateTotal());
        const discount = total * (this.percent / 100);
        
        // Returns number rounded to 2 decimal places.
        return parseFloat(discount.toFixed(2));
    }
}

/**
 * Subclass: FlatDiscount
 * Behavior: Subtracts a fixed dollar amount from the total.
 */
export class FlatDiscount extends DiscountStrategy {
    constructor(amount) {
        super();
        this.amount = amount;
    }

    apply(cart) {
        // Trigger parent validation logic
        super.apply(cart);

        const total = parseFloat(cart.calculateTotal());
        
        // Ensure discount doesn't exceed the total price.
        const discount = Math.min(this.amount, total);
        return parseFloat(discount.toFixed(2));
    }
}

/**
 * Subclass: ConditionalDiscount
 * Behavior: Applies a discount only if a quantity threshold is met.
 */
export class ConditionalDiscount extends DiscountStrategy {
    constructor(thresholdQuantity, discountAmount) {
        super();
        this.threshold = thresholdQuantity;
        this.discountAmount = discountAmount;
    }

    apply(cart) {
        // Trigger parent validation logic
        super.apply(cart);

        // Calculate total quantity by summing items.
        const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

        // Apply discount if criteria is met, otherwise return 0.
        if (totalQuantity >= this.threshold) {
            return parseFloat(this.discountAmount.toFixed(2));
        }
        return 0;
    }
}
