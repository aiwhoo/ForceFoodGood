/**
 * Parent Class: DiscountStrategy
 * Description: Base class for the strategy pattern.
 */
export class DiscountStrategy {
    /**
     * @param {Object} cart - The cart object to validate.
     */
    apply(cart) {
        // 1. DUCK TYING VALIDATION: 
        // This checks if the cart exists and has the necessary method.
        // This passes for both real Cart instances and Mock objects used in tests.
        if (!cart || typeof cart.calculateTotal !== 'function') {
            throw new Error("Invalid input: Expected an instance of Cart.");
        }

        // 2. ABSTRACTION PROTECTION:
        // Only throw "must be implemented" if the base class is called directly.
        if (this.constructor === DiscountStrategy) {
            throw new Error("Method 'apply()' must be implemented by subclass.");
        }
    }
}

/**
 * Subclass: PercentageDiscount
 */
export class PercentageDiscount extends DiscountStrategy {
    constructor(percent) {
        super();
        this.percent = percent;
    }

    apply(cart) {
        // Runs parent validation, but constructor check passes because 'this' is a subclass.
        super.apply(cart);

        const total = parseFloat(cart.calculateTotal());
        const discount = total * (this.percent / 100);
        return parseFloat(discount.toFixed(2));
    }
}

/**
 * Subclass: FlatDiscount
 */
export class FlatDiscount extends DiscountStrategy {
    constructor(amount) {
        super();
        this.amount = amount;
    }

    apply(cart) {
        super.apply(cart);

        const total = parseFloat(cart.calculateTotal());
        const discount = Math.min(this.amount, total);
        return parseFloat(discount.toFixed(2));
    }
}

/**
 * Subclass: ConditionalDiscount
 */
export class ConditionalDiscount extends DiscountStrategy {
    constructor(thresholdQuantity, discountAmount) {
        super();
        this.threshold = thresholdQuantity;
        this.discountAmount = discountAmount;
    }

    apply(cart) {
        super.apply(cart);

        // Accessing cart.items directly for the conditional logic
        const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

        if (totalQuantity >= this.threshold) {
            return parseFloat(this.discountAmount.toFixed(2));
        }
        return 0;
    }
}
