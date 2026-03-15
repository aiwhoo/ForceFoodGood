import { expect } from 'chai';
import DeliveryDriverRatingModel from "../core/models/ratings/deliveryDriverRatingsModel.js";
import MenuItemRatingModel from "../core/models/ratings/menuItemRatingsModel.js";
import RestaurantRatingModel from "../core/models/ratings/restaurantRatingsModel.js";

describe("Rating Hierarchy Tests", function () {

    it("should correctly create ratings for all subclasses", function () {
        // This test ensures each subclass correctly inherits properties
        // from the base RatingModel class. Proper inheritance is essential
        // so that all rating types store star values, usernames, and IDs
        // consistently across the system.

        const restaurant = new RestaurantRatingModel(5, "Jason", "2026-03-11", 101, "Great food");
        const menuItem = new MenuItemRatingModel(4, "Alex", "2026-03-11", 55, "Great pizza");
        const driver = new DeliveryDriverRatingModel(3, "Chris", "2026-03-11", "Fast delivery", 12);

        expect(restaurant.stars).to.equal(5);
        expect(menuItem.stars).to.equal(4);
        expect(driver.stars).to.equal(3);

        expect(restaurant.restaurantId).to.equal(101);
        expect(menuItem.menuItemId).to.equal(55);
        expect(driver.driverId).to.equal(12);
    });

    it("should calculate the correct restaurant average wait time", function () {
        // This test validates the RestaurantRatingModel averageWaitTime()
        // method. Correct averages are important because they determine
        // the wait time rating users see when evaluating restaurants.

        const r1 = new RestaurantRatingModel(5, "User1", "today", 1, "");
        const r2 = new RestaurantRatingModel(3, "User2", "today", 1, "");

        const ratings = [r1, r2];

        // Attach ratings to the restaurant instance
        r1.restaurantWaitTimes = ratings;

        expect(r1.averageWaitTime()).to.equal(4);
    });

    it("should calculate the correct delivery driver average rating", function () {
        // This test verifies the subclass-specific driver averaging logic.
        // Accurate driver averages are important to evaluate delivery quality.

        const d1 = new DeliveryDriverRatingModel(4, "User1", "today", "", 2);
        const d2 = new DeliveryDriverRatingModel(2, "User2", "today", "", 2);

        const ratings = [d1, d2];

        expect(d1.calculateDriverAverage(ratings)).to.equal(3);
    });

    it("should reject invalid ratings outside the allowed range", function () {
        // This edge case test ensures rating validation prevents
        // invalid star values. This protects system stability and
        // prevents corrupt rating data from entering the system.

        expect(() => {
            new MenuItemRatingModel(-1, "User", "today", "", 5);
        }).to.throw();

        expect(() => {
            new RestaurantRatingModel(7, "User", "today", "", 1);
        }).to.throw();
    });

    it("should return 0 when calculating an average with no reviews", function () {
        // This edge case test ensures the average rating calculation
        // handles an empty ratings array safely. Without this safeguard,
        // the system could attempt to divide by zero and cause an error.
        // Returning 0 ensures the application remains stable when no
        // reviews exist yet for a restaurant, menu item, or driver.

        const restaurant = new RestaurantRatingModel(5, "User", "today", "", 1);

        const ratings = [];

        expect(restaurant.averageWaitTime()).to.equal(0);
    });

});