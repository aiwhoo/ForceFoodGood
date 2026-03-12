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

    // Single source of truth for price
    calculateTotal() {
        // 1. Calculate Subtotal
        let rawSubtotal = this.itemsOrdered.reduce((sum, item) => sum + item.price, 0);
        let subtotal = Math.round((rawSubtotal + Number.EPSILON) * 100) / 100;

        // 2. Apply Promo (if valid)
        if (this.promoCode in this.validPromoCodes) {
            subtotal -= (subtotal * this.validPromoCodes[this.promoCode]);
        }

        // 3. Apply Tax on the discounted amount
        let taxAmount = (subtotal * CartOrderModel.TAX) - subtotal;

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
        } else {
            throw new Error("Unable to remove item -- duped MenuItemModel");
        }
    }
    summary() {
        return super.summary()+`\n[CART] ${this.itemsOrdered.length} items - Total: $${this.totalCost.toFixed(2)}`;
    }
}
export default CartOrderModel;