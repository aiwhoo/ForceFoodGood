import MenuModel from "./menuModel.js";
class RestaurantMenuModel extends MenuModel {
    constructor(restaurant) {
        super(restaurant);
    }

    // Override: Return formatted menu for UI display
    getAllItems() {
        return this.items.map(item => ({
            name: item.getName(),
            category: item.getCategory(),
            price: item.getPrice()
        }));
    }

    // Specific behavior: filter items by category
    filterByCategory(category) {
        return this.items.filter(item => item.getCategory() === category);
    }

    // Display-friendly menu structure
    getMenuForDisplay() {
        return this.items.map(item =>
            `${item.getName()} - $${item.getPrice()} (${item.getCategory()})`
        );
    }
}
export default RestaurantMenuModel;