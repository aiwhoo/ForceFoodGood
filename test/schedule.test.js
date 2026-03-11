import { expect } from 'chai';
import { ScheduleModel, RestaurantSchedule, DriverSchedule, DeliverySlot } from '../core/models/scheduleModel.js';

describe("ScheduleModel Polymorphism Tests", () => {
    // 1. Base Class Behavior + Failure Condition
    it("should return false by default for the base ScheduleModel (Safety Net)", () => {
        // This validates the PARENT class behavior as a safety net.
        const base = new ScheduleModel("BASE-01");
        expect(base.isAvailable(1200)).to.be.false;
    });

    // 2. Subclass Override 1: Restaurant (Happy Path)
    it("should confirm RestaurantSchedule is open during valid hours", () => {
        // This validates the first SUBCLASS override logic.
        const res = new RestaurantSchedule("R1", 900, 2200);
        expect(res.isAvailable(1200)).to.be.true;
    });

    // 3. Subclass Override 2: Driver (State Change / Behavioral Validation)
    it("should show DriverSchedule as unavailable if the driver is on break", () => {
        // This validates the second SUBCLASS override and state-based logic.
        const driver = new DriverSchedule("D1", 800, 1600);
        driver.onBreak = true;
        expect(driver.isAvailable(1000)).to.be.false;
    });

    // 4. Subclass Override 3: Delivery Slot (Edge Case / Boundary)
    it("should show DeliverySlot as unavailable once it has been booked", () => {
        // This validates the third SUBCLASS and tests the booking 'edge' state.
        const slot = new DeliverySlot("S1");
        slot.isBooked = true;
        expect(slot.isAvailable()).to.be.false;
    });

});