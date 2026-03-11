/**
 * Parent Class: DiscountStrategy
 * Description: Serves as the base for the polymorphic discount system.
 * It handles shared logic (validation) to ensure subclasses receive clean data.
 */
export class DiscountStrategy {
    /**
     * @param {Object} cart - The cart object to validate.
     * Shared logic: Ensures the input is not null and has the required methods.
     */
    apply(cart) {
        // Validation logic: This is what runs when subclasses call super.apply(cart)
        if (!cart || typeof cart.calculateTotal !== 'function') {
            throw new Error("Invalid input: Expected an instance of Cart.");
        }
        // Note: We do not throw "Method not implemented" here anymore 
        // to allow the 'super.apply' chain to complete without crashing.
    }
}

/**
 * Subclass: PercentageDiscount
 * Behavior: Applies a percentage-based reduction to the cart total.
 */
export class PercentageDiscount extends DiscountStrategy {
    constructor(percent) {
        super();
        this.percent = percent;
    }

    /**
     * @param {Object} cart 
     * @returns {number} The calculated discount amount.
     */
    apply(cart) {
        // Trigger parent validation logic (per code review suggestion)
        super.apply(cart);

        // Core logic: Total * (Percent / 100)
        const total = parseFloat(cart.calculateTotal());
        const discount = total * (this.percent / 100);
        
        // return as number rounded to 2 decimal places
        return parseFloat(discount.toFixed(2));
    }
}

/**
 * Subclass: FlatDiscount
 * Behavior: Subtracts a fixed dollar amount from the cart total.
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
        
        // Edge Case: Use Math.min to ensure discount doesn't exceed the total price.
        // This prevents the final total from becoming a negative number.
        const discount = Math.min(this.amount, total);
        return parseFloat(discount.toFixed(2));
    }
}

/**
 * Subclass: ConditionalDiscount
 * Behavior: Applies a flat discount only if a quantity threshold is met.
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

        // Calculate total quantity by summing the 'quantity' property of all items.
        const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

        // Conditional Logic: Check if threshold is reached.
        if (totalQuantity >= this.threshold) {
            return parseFloat(this.discountAmount.toFixed(2));
        }
        
        // If criteria not met, no discount is applied.
        return 0;
    }
}
