import MenuItemModel from "../core/models/MenuItemModel.js";

describe("MenuItemModel Instantiation", () => {

    // Instantiate multiple MenuItem objects
    const burger = new MenuItemModel("Burger", 8.99);
    const pizza = new MenuItemModel("Pizza", 12.99);
    const fries = new MenuItemModel("Fries", 4.99);
    const soda = new MenuItemModel("Soda", 2.49);
    const salad = new MenuItemModel("Salad", 6.99);

    test("Objects should be created correctly", () => {

        expect(burger).toBeDefined();
        expect(pizza).toBeDefined();
        expect(fries).toBeDefined();
        expect(soda).toBeDefined();
        expect(salad).toBeDefined();

    });

});