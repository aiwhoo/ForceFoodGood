import Item from './Item.js';

class MenuItem extends Item {
    updatePrice(newPrice) {
        if (typeof newPrice === 'number' && newPrice >= 0) {
            this.price = newPrice;
            return true;
        }
        return false;
    }

    updateDescription(newDesc) {
        if (typeof newDesc === 'string') {
            this.description = newDesc;
            return true;
        }
        return false;
    }
}
export default MenuItem;