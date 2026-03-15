import Item from './Item.js';

class CartItem extends Item {
    calculateSubtotal(quantity) {
        if (typeof quantity !== 'number' || quantity <= 0) return 0;
        return this.price * quantity;
    }

    applyDiscount(discountPercentage) {
        if (typeof discountPercentage === 'number' && discountPercentage >= 0 && discountPercentage <= 100) {
            const discountAmount = this.price * (discountPercentage / 100);
            this.price = this.price - discountAmount;
            return true;
        }
        return false;
    }
}
export default CartItem;