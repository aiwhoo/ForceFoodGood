import { expect } from "chai";
import MenuModel from "../core/models/menus/menuModel.js";
import RestaurantMenuModel from "../core/models/menus/restaurantMenuModel.js";
import MenuItemModel from "../core/models/menuItemModel.js";

describe("RestaurantMenuModel Tests", function () {

    it("should return formatted items with name, category, and price", function () {

        /*
        Why this test exists:
        This verifies the overridden getAllItems() method in RestaurantMenuModel.

        What behavior it validates:
        The subclass should transform MenuItemModel objects into simple
        objects suitable for UI display (name, category, price).

        Why it is important:
        UI systems depend on properly formatted data. If the formatting
        fails, the frontend could break or display incorrect information.
        */

        const menu = new RestaurantMenuModel("Test Restaurant");

        const item = new MenuItemModel("Burger", 10, "Tasty", "Main");

        menu.addItem(item);

        const items = menu.getAllItems();

        expect(items[0].name).to.equal("Burger");
        expect(items[0].price).to.equal(10);
        expect(items[0].category).to.equal("Main");
    });


    it("should demonstrate polymorphism with MenuModel", function () {

        /*
        Why this test exists:
        This test confirms polymorphic behavior between the parent MenuModel
        and subclass RestaurantMenuModel.

        What behavior it validates:
        Both classes implement getAllItems(), but they return different
        data structures.

        Why it is important:
        Polymorphism allows systems to treat different menu types uniformly
        while still allowing specialized behavior in subclasses.
        */

        const baseMenu = new MenuModel("Restaurant");
        const restaurantMenu = new RestaurantMenuModel("Restaurant");

        const item = new MenuItemModel("Pizza", 15, "Cheesy", "Main");

        baseMenu.addItem(item);
        restaurantMenu.addItem(item);

        const baseItems = baseMenu.getAllItems();
        const restaurantItems = restaurantMenu.getAllItems();

        expect(baseItems[0]).to.be.instanceOf(MenuItemModel);
        expect(restaurantItems[0]).to.have.property("name");
        expect(restaurantItems[0]).to.have.property("price");
    });


    it("should correctly filter items by category", function () {

        /*
        Why this test exists:
        This tests the filterByCategory() method.

        What behavior it validates:
        Only items matching the specified category should be returned.

        Why it is important:
        Restaurants frequently organize menus by category (e.g., drinks,
        appetizers, desserts). Incorrect filtering could lead to incorrect
        menu displays.
        */

        const menu = new RestaurantMenuModel("Restaurant");

        const item1 = new MenuItemModel("Burger", 10, "Tasty", "Main");
        const item2 = new MenuItemModel("Cake", 6, "Sweet", "Dessert");

        menu.addItem(item1);
        menu.addItem(item2);

        const desserts = menu.filterByCategory("Dessert");

        expect(desserts.length).to.equal(1);
        expect(desserts[0].getName()).to.equal("Cake");
    });


    it("should handle edge case when filtering category that does not exist", function () {

        /*
        Why this test exists:
        This tests the edge case where a category is requested that does not
        exist in the menu.

        What behavior it validates:
        The method should return an empty array instead of crashing or
        returning incorrect data.

        Why it is important:
        Robust systems must handle unexpected inputs gracefully without
        causing application errors.
        */

        const menu = new RestaurantMenuModel("Restaurant");

        const item = new MenuItemModel("Burger", 10, "Tasty", "Main");

        menu.addItem(item);

        const drinks = menu.filterByCategory("Drinks");

        expect(drinks.length).to.equal(0);
    });


    it("should return display-friendly menu strings", function () {

        /*
        Why this test exists:
        This verifies the getMenuForDisplay() method.

        What behavior it validates:
        The method should return formatted strings suitable for direct UI
        display.

        Why it is important:
        This ensures the menu can easily be rendered in user interfaces
        without additional formatting logic.
        */

        const menu = new RestaurantMenuModel("Restaurant");

        const item = new MenuItemModel("Pasta", 12, "Italian", "Main");

        menu.addItem(item);

        const displayMenu = menu.getMenuForDisplay();

        expect(displayMenu[0]).to.equal("Pasta - $12 (Main)");
    });

});