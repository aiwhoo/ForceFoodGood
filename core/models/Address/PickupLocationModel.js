// PickupLocationModel.js
import AddressModel from './AddressModel.js';

class PickupLocationModel extends AddressModel {
    // x represents Northing (+ North, - South)
    // y represents Easting (+ East, - West)
    constructor(street, city, state, zip, x, y) {
        super(street, city, state, zip);
        this.x = x;
        this.y = y;
    }

    // Helper method to process the coordinates into human-readable directions
    getDirectionalString() {
        const northSouth = this.x >= 0 ? "North" : "South";
        const eastWest = this.y >= 0 ? "East" : "West";

        return `${Math.abs(this.x)} miles ${northSouth}, ${Math.abs(this.y)} miles ${eastWest}`;
    }

    // Unique behavior: Validate Cartesian coordinates from user origin (0,0)
    validateCoordinates() {
        // Detect invalid inputs and throw an error
        if (typeof this.x !== 'number' || typeof this.y !== 'number' || isNaN(this.x) || isNaN(this.y)) {
            throw new Error("Invalid coordinate input");
        }

        // Calculate straight-line distance from user (0,0) to the pickup location.
        const distance = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        const MAX_ALLOWED_DISTANCE = 25;

        // Determine whether the location is too far away and throw a detailed error
        if (distance > MAX_ALLOWED_DISTANCE) {
            const directionInfo = this.getDirectionalString();
            throw new Error(`Location is too far from the user. Pickup is ${directionInfo} (Distance: ${distance.toFixed(2)} miles).`);
        }

        return true; // Valid coordinates and within range
    }

    // Unique behavior: Trigger a notification
    notifyDriver() {
        const directionInfo = this.getDirectionalString();
        console.log(`Driver notified to proceed to relative coordinates: [${directionInfo}]`);
        return true;
    }

    // POLYMORPHISM: Overriding the parent validate() method
    validate() {
        // Returns true only if BOTH the parent validation passes AND the coordinates are valid
        return super.validate() && this.validateCoordinates();
    }
}

export default PickupLocationModel;