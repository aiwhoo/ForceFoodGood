import { expect } from 'chai';
import RestaurantAddressModel from '../core/models/Address/RestaurantAddressModel.js';

describe('RestaurantAddressModel', () => {
    it('should inherit base validate() and fail if core address fields are empty', () => {
        const badRestaurantLoc = new RestaurantAddressModel("Burger Spot", "", "Bear", "DE", "19701", 10);
        expect(badRestaurantLoc.validate()).to.be.false;
    });

    it('should completely override format() to include emojis, name, and radius', () => {
        const restaurantLoc = new RestaurantAddressModel("Burger Spot", "99 Food Ct", "Newark", "DE", "19711", 15);
        const formatted = restaurantLoc.format();
        expect(formatted).to.include("🏪 Burger Spot");
        expect(formatted).to.include("📍 Address: 99 Food Ct, Newark, DE 19711");
        expect(formatted).to.include("🚗 Delivery available within a 15-mile radius");
    });

    it('should pass delivery area validation when radius is exactly at the boundary (70 miles)', () => {
        const restaurantLoc = new RestaurantAddressModel("Burger Spot", "99 Food Ct", "Newark", "DE", "19711", 70);
        expect(restaurantLoc.validateDeliveryArea("19701")).to.be.true;
    });

    it('should throw an error if the delivery radius exceeds the allowed 70-mile limit', () => {
        const restaurantLoc = new RestaurantAddressModel("Burger Spot", "99 Food Ct", "Newark", "DE", "19711", 75);
        expect(() => restaurantLoc.validateDeliveryArea("19701")).to.throw("Delivery radius exceeds allowed limit");
    });
});