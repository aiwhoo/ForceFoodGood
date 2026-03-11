import { expect } from 'chai';
import { RestaurantSchedule, DriverSchedule, DeliverySlot } from '../core/models/schedule.js';

describe("Schedule Polymorphism Tests", () => {
    //Happy Path
    it("should confirm restaurant is open during valid hours", () => {
        const res = new RestaurantSchedule("R1", 900, 2200);
        // Why: Validates basic time-range logic for the restaurant subclass.
        expect(res.isAvailable(1200)).to.be.true;
    });

    //Subclass Override (Driver )
    it("should show driver unavailable if on break", () => {
        const driver = new DriverSchedule("D1", 800, 1600);
        driver.onBreak = true;
        // Why: Validates that DriverSchedule properly overrides base logic with 'break' state.
        expect(driver.isAvailable(1000)).to.be.false;
    });

    //Edge Case (bounds)
    it("should show restaurant closed exactly at closing time", () => {
        const res = new RestaurantSchedule("R1", 900, 2200);
        // Why: Tests the boundary condition of the availability range.
        expect(res.isAvailable(2201)).to.be.false;
    });

    // Test 4: Failure Case (State check)
    it("should show delivery slot unavailable if already booked", () => {
        const slot = new DeliverySlot("S1");
        slot.isBooked = true;
        // Why: Confirms the system prevents double-booking (State validation).
        expect(slot.isAvailable()).to.be.false;
    });
});