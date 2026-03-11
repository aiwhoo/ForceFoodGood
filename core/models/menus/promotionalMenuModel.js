import MenuModel from "./menuModel.js";

class PromotionalMenu extends MenuModel {
    constructor(restaurant, discount = 0) {
        super(restaurant);
        this.discount = discount;
    }

    getAllItems() {
        return this.items.map(item => ({
            name: item.getName(),
            category: item.getCategory(),
            originalPrice: item.getPrice(),
            discountedPrice: item.getPrice() * (1 - this.discount),
            expired: item.isExpired()
        }));
    }

    applyPromotion(discount) {
        if(discount < 0 || discount > 1) {
            throw new Error("Discount must be between 0 and 1");
        }
        this.discount = discount;
    }

    removeExpiredItems() {
        this.items = this.items.filter(item => !item.isExpired());
    }
}

export default PromotionalMenu;