import Cart from './cartModel.js';

/**
 * Parent Class: DiscountStrategy
 * Description: Base class for different discount calculation methods.
 */
export class DiscountStrategy {
    /**
     * parameter {Cart} cart - An instance of the Cart class.
     */
    apply(cart) {
        if (!(cart instanceof Cart)) {
            throw new Error("Invalid input: Expected an instance of Cart.");
        }
        throw new Error("Method 'apply()' must be implemented by subclass.");
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
         super.apply(cart)
        // Access the cart's total and convert from string to number
        const total = parseFloat(cart.calculateTotal());
        const discount = total * (this.percent / 100);
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
         super.apply(cart)
        const total = parseFloat(cart.calculateTotal());
        // Ensure discount doesn't exceed the total price
        const discount = Math.min(this.amount, total);
        return parseFloat(discount.toFixed(2));
    }
}

/**
 * Subclass: ConditionalDiscount
 * Behavior: Applies a discount only if a specific item count is reached.
 */
export class ConditionalDiscount extends DiscountStrategy {
    constructor(thresholdQuantity, discountAmount) {
        super();
        this.threshold = thresholdQuantity;
        this.discountAmount = discountAmount;
    }

    apply(cart) {
         super.apply(cart)
        // Calculate total quantity by looking directly at cart.items
        const totalQuantity = cart.items.reduce((acc, item) => acc + item.quantity, 0);

        if (totalQuantity >= this.threshold) {
            return parseFloat(this.discountAmount.toFixed(2));
        }
        return 0;
    }
}
