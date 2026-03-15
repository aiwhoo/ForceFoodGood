import MenuModel from "../core/models/menus/menuModel.js";
import MenuItemModel from "../core/models/menuItemModel.js";
import assert from "assert";

describe("MenuModel Tests", function () {

    it("should add a valid MenuItemModel to the menu", function () {

        /*
        Why this test exists:
        This verifies the base functionality of MenuModel: adding items to the menu.

        What behavior it validates:
        It ensures addItem() correctly stores MenuItemModel objects in the items array.

        Why it is important:
        If menu items cannot be added properly, the entire restaurant menu system
        will fail to function.
        */

        const menu = new MenuModel("Test Restaurant");
        const item = new MenuItemModel("Burger", 10, "Tasty", "Main");

        menu.addItem(item);

        assert.strictEqual(menu.getAllItems().length, 1);
        assert.strictEqual(menu.getAllItems()[0].getName(), "Burger");
    });


    it("should throw an error when adding a non-MenuItemModel object", function () {

        /*
        Why this test exists:
        This checks the failure condition when an invalid object is passed to addItem().

        What behavior it validates:
        It confirms that the system rejects incorrect object types.

        Why it is important:
        Without this validation, corrupted objects could enter the menu system
        and break functions that expect MenuItemModel methods like getName().
        */

        const menu = new MenuModel("Test Restaurant");

        assert.throws(() => {
            menu.addItem({ name: "Fake Item" });
        }, Error);
    });


    it("should remove an item by name correctly", function () {

        /*
        Why this test exists:
        This ensures removeItemByName() properly removes a specific menu item.

        What behavior it validates:
        Only the targeted item should be removed while other items remain.

        Why it is important:
        Restaurants frequently update menus. Incorrect removal behavior
        could lead to incorrect menu displays for customers.
        */

        const menu = new MenuModel("Test Restaurant");

        const item1 = new MenuItemModel("Burger", 10, "Tasty", "Main");
        const item2 = new MenuItemModel("Salad", 7, "Healthy", "Starter");

        menu.addItem(item1);
        menu.addItem(item2);

        menu.removeItemByName("Burger");

        assert.strictEqual(menu.getAllItems().length, 1);
        assert.strictEqual(menu.getAllItems()[0].getName(), "Salad");
    });


    it("should handle removing a non-existent item without crashing", function () {

        /*
        Why this test exists:
        This tests an edge case where removeItemByName() is called for an item
        that does not exist.

        What behavior it validates:
        The menu should remain unchanged and the system should not crash.

        Why it is important:
        Real systems receive unpredictable input. The application must remain
        stable even when asked to remove items that do not exist.
        */

        const menu = new MenuModel("Test Restaurant");

        const item = new MenuItemModel("Pizza", 12, "Cheesy", "Main");

        menu.addItem(item);

        menu.removeItemByName("Nonexistent");

        assert.strictEqual(menu.getAllItems().length, 1);
        assert.strictEqual(menu.getAllItems()[0].getName(), "Pizza");
    });

});