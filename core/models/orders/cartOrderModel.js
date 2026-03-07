import OrderModel from "./orderModel.js";

class CartOrderModel extends OrderModel {
    TAX = 1.1;


    constructor(lastModified, promoCode, validationErrors, validPromoCodes) {
        super();
        this.lastModified = lastModified;
        this.promoCode = promoCode;
        this.validationErrors = validationErrors;
        this.validPromoCodes = validPromoCodes;
    }
    updateLastModified() {
        //TODO: rn times are local,
        // will need to have standard time that isn't in milliseconds
        this.lastModified = Date.now();
    }

    applyPromoCode(promoCode) {
        if (this.promoCode in this.validPromoCodes) {
            this.totalCost = this.totalCost * 0.95
        }
    }

    applyTax() {
        this.totalCost = this.totalCost * (this.TAX)
    }

    // calculates the cost of the order after adding item to cart
    updateCost() {
        this.totalCost = 0;
        for (let i = 0; i < this.itemsOrdered.length; i++) {
            this.totalCost += this.itemsOrdered[i].price;
        }
    }

    // adds an item to the order
    addMenuItem(aMenuItem) {
        this.itemsOrdered.push(aMenuItem);
        this.updateCost();
    }

    // removes an item from the order
    removeMenuItem(aMenuItem) {
        this.itemsOrdered.splice(this.itemsOrdered.indexOf(aMenuItem), 1);
        this.updateCost();
    }
}