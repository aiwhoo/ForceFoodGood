/**
 * Parent Class: DiscountStrategy
 */
/**
 * Parent Class: DiscountStrategy
 * Description: Base class for the strategy pattern.
 */
export class DiscountStrategy {
    /**
     * @param {Object} cart - The cart object to validate.
     */
    apply(cart) {
        // 1. VALIDATE DATA FIRST
        // This satisfies the test at line 29. Even in the base class, 
        // if the input is bad, we must throw the "Invalid input" error first.
        if (!cart || typeof cart.calculateTotal !== 'function') {
            throw new Error("Invalid input: Expected an instance of Cart.");
        }

        // 2. VALIDATE ARCHITECTURE SECOND
        // If the data is fine, but we are still in the base class, 
        // THEN throw the implementation error.
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
        // Calls the parent apply(). 
        // It passes Step 1 (validation) and skips Step 2 (because it's a subclass).
        super.apply(cart);

        const total = parseFloat(cart.calculateTotal());
        const discount = total * (this.percent / 100);
        return parseFloat(discount.toFixed(2));
    }
}

// ... Keep FlatDiscount and ConditionalDiscount exactly as they were ...

/**
 * Subclass: PercentageDiscount
 */
export class PercentageDiscount extends DiscountStrategy {
    constructor(percent) {
        super();
        this.percent = percent;
    }

    apply(cart) {
        // Calls parent validation (Step 1)
        // Passes the constructor check (Step 2) because this.constructor is PercentageDiscount
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
        const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

        if (totalQuantity >= this.threshold) {
            return parseFloat(this.discountAmount.toFixed(2));
        }
        return 0;
    }
}
