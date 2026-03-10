import OrderModel from "./OrderModel.js";

class CartOrderModel extends OrderModel {
    static TAX = 1.1;
    static PROMO_DISCOUNT = 0.05;


    constructor(base, lastModified, promoCode, validationErrors, validPromoCodes) {
        super(base.username, base.restaurant, base.id);
        this.lastModified = lastModified;
        this.promoCode = promoCode;
        this.validationErrors = validationErrors;
        this.validPromoCodes = validPromoCodes;
    }
    updateLastModified() {
        this.lastModified = new Date().toISOString();
    }

    applyPromoCode(promoCode) {
        if (this.promoCode in this.validPromoCodes) {
            this.totalCost = this.totalCost * 0.95
        }
    }

    applyTax() {
        this.totalCost = this.totalCost * (this.TAX)
    }

    // Single source of truth for price
    calculateTotal() {
        // 1. Calculate Subtotal
        let subtotal = this.itemsOrdered.reduce((sum, item) => sum + item.price, 0);

        // 2. Apply Promo (if valid)
        if (this.promoCode in this.validPromoCodes) {
            subtotal -= (subtotal * CartOrderModel.PROMO_DISCOUNT);
        }

        // 3. Apply Tax on the discounted amount
        let taxAmount = subtotal * CartOrderModel.TAX;

        this.totalCost = subtotal + taxAmount;
        this.updateLastModified()
        this.subtotal = subtotal;
        this.taxTotal = taxAmount;
    }

    addMenuItem(item) {
        this.itemsOrdered.push(item);
        this.calculateTotal();
    }

    removeMenuItem(item) {
        const index = this.itemsOrdered.indexOf(item);
        if (index > -1) {
            this.itemsOrdered.splice(index, 1);
            this.calculateTotal();
        }
    }
}
export default CartOrderModel;