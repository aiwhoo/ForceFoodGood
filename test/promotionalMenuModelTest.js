import { expect } from "chai";
import PromotionalMenu from "../core/models/menus/promotionalMenuModel.js";
import MenuModel from "../core/models/menus/menuModel.js";
import MenuItemModel from "../core/models/menuItemModel.js";

describe("PromotionalMenu Tests", function () {

    it("should apply discount correctly in getAllItems()", function () {

        /*
        Why this test exists:
        This test verifies that PromotionalMenu correctly applies the discount
        when returning items.

        What behavior it validates:
        The getAllItems() method overrides the parent MenuModel method and
        returns a transformed object containing discountedPrice.

        Why it is important:
        This confirms the promotional pricing system works and ensures
        customers see correct discounted prices.
        */

        const menu = new PromotionalMenu("Test Restaurant", 0.2);

        const item = new MenuItemModel("Burger", 10, "Tasty", "Main");

        menu.addItem(item);

        const items = menu.getAllItems();

        expect(items[0].discountedPrice).to.equal(8);
        expect(items[0].originalPrice).to.equal(10);
    });


    it("should demonstrate polymorphism between MenuModel and PromotionalMenu", function () {

        /*
        Why this test exists:
        This test validates polymorphic behavior between the parent class
        (MenuModel) and subclass (PromotionalMenu).

        What behavior it validates:
        The same method (getAllItems) behaves differently depending on the
        object type.

        Why it is important:
        Polymorphism is a core OOP concept. Ensuring correct override behavior
        guarantees subclasses modify functionality safely without breaking
        the parent system.
        */

        const baseMenu = new MenuModel("Restaurant");
        const promoMenu = new PromotionalMenu("Restaurant", 0.5);

        const item = new MenuItemModel("Pizza", 20, "Cheesy", "Main");

        baseMenu.addItem(item);
        promoMenu.addItem(item);

        const baseItems = baseMenu.getAllItems();
        const promoItems = promoMenu.getAllItems();

        expect(baseItems[0].getPrice()).to.equal(20);
        expect(promoItems[0].discountedPrice).to.equal(10);
    });


    it("should throw error when invalid discount is applied", function () {

        /*
        Why this test exists:
        This checks the failure path for invalid promotional discounts.

        What behavior it validates:
        applyPromotion() must reject discounts outside the valid range (0–1).

        Why it is important:
        Prevents invalid discounts (like negative prices or >100% discounts)
        that could corrupt pricing logic or financial calculations.
        */

        const menu = new PromotionalMenu("Restaurant");

        expect(() => menu.applyPromotion(-0.5)).to.throw();
        expect(() => menu.applyPromotion(1.5)).to.throw();
    });


    it("should remove expired items correctly", function () {

        /*
        Why this test exists:
        This verifies that expired promotional items are removed properly.

        What behavior it validates:
        removeExpiredItems() should filter the menu so only non-expired
        items remain.

        Why it is important:
        Promotional systems frequently expire items. If expired items remain,
        customers may attempt to order unavailable promotions.
        */

        const menu = new PromotionalMenu("Restaurant");

        const validItem = new MenuItemModel("Burger", 10, "Tasty", "Main");
        const expiredItem = new MenuItemModel("Old Soup", 5, "Old", "Starter");

        // Force expired state for testing
        expiredItem.isExpired = () => true;
        validItem.isExpired = () => false;

        menu.addItem(validItem);
        menu.addItem(expiredItem);

        menu.removeExpiredItems();

        const items = menu.getAllItems();

        expect(items.length).to.equal(1);
        expect(items[0].name).to.equal("Burger");
    });

});