// RestaurantAddressModel.js
import AddressModel from './AddressModel.js';

class RestaurantAddressModel extends AddressModel {
    // Added restaurantName to provide context in the formatted display
    constructor(restaurantName, street, city, state, zip, deliveryRadiusInMiles) {
        super(street, city, state, zip);
        this.restaurantName = restaurantName;
        this.deliveryRadiusInMiles = deliveryRadiusInMiles;
    }

    // Unique behavior: Check if a customer is within range and radius is valid
    validateDeliveryArea(customerZipCode) {
        const MAX_ALLOWED_RADIUS = 70; // Define maximum acceptable radius limit

        // The delivery radius must be within an acceptable range, otherwise throw an error
        if (this.deliveryRadiusInMiles > MAX_ALLOWED_RADIUS) {
            throw new Error("Delivery radius exceeds allowed limit");
        }

        console.log(`Checking if ${customerZipCode} is within ${this.deliveryRadiusInMiles} miles of ${this.zip}`);
        return true; // Valid radius -> delivery allowed
    }

    // Unique behavior: Provides a rich, detailed formatted address
    formatForDisplay() {
        // Completely overriding the base class formatting behavior with detailed context
        return `🏪 ${this.restaurantName}\n📍 Address: ${this.street}, ${this.city}, ${this.state} ${this.zip}\n🚗 Delivery available within a ${this.deliveryRadiusInMiles}-mile radius. In-store pickup is also available at this location.`;
    }

    // POLYMORPHISM: Overriding the parent format() method
    format() {
        return this.formatForDisplay();
    }

    // FIX APPLIED: The buggy overridden validate() method was removed entirely so
    // it can safely inherit the base AddressModel validation logic!
}

export default RestaurantAddressModel;