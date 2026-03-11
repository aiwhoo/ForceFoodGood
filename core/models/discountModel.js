/**
 * Parent Class: DiscountStrategy
 */
export class DiscountStrategy {
    /**
     * @param {Object} cart - The cart object to validate.
     */
    apply(cart) {
        // 1. VALIDATE INPUT FIRST
        // This ensures the test gets the "Invalid input" error it expects
        if (!cart || typeof cart.calculateTotal !== 'function') {
            throw new Error("Invalid input: Expected an instance of Cart.");
        }

        // 2. CHECK FOR BASE CLASS SECOND
        // This ensures the base class remains abstract
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
