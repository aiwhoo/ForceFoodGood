import { expect } from 'chai';
import PickupLocationModel from '../core/models/Address/PickupLocationModel.js';

describe('PickupLocationModel', () => {
    it('should inherit base format() perfectly without exposing cartesian coordinate data', () => {
        const pickupLoc = new PickupLocationModel("Stadium Lot A", "Philadelphia", "PA", "19148", 10, 10);
        const formatted = pickupLoc.format();
        expect(formatted).to.equal("Stadium Lot A, Philadelphia, PA 19148");
    });

    it('should override validate() and pass when address is present and coordinates are within 25 miles', () => {
        const pickupLoc = new PickupLocationModel("Stadium Lot A", "Philadelphia", "PA", "19148", 3, 4);
        expect(pickupLoc.validate()).to.be.true;
    });

    it('should successfully handle extreme negative coordinates (South/West) and pass if distance is valid', () => {
        const pickupLoc = new PickupLocationModel("Stadium Lot A", "Philadelphia", "PA", "19148", -15, -15);
        expect(pickupLoc.validate()).to.be.true;
    });

    it('should throw a detailed error if the calculated distance exceeds 25 miles', () => {
        const pickupLoc = new PickupLocationModel("Stadium Lot A", "Philadelphia", "PA", "19148", 20, 20);
        expect(() => pickupLoc.validate()).to.throw(Error, "Location is too far from the user.");
    });
});