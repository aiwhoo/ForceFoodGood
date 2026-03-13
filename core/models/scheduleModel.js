export class ScheduleModel {
    constructor(id) {
        this.id = id;
    }

    /**
     * Polymorphic method to check availability.
     * @param {*} param - The parameter used to determine availability (e.g., time or status).
     * @returns {boolean} - Defaults to false as a safety net.
     */

    isAvailable(param) {
        return false;
    }
}

//first subclass with the restaurant - restaurant opening hours
export class RestaurantSchedule extends ScheduleModel {
    constructor(id, openTime, closeTime) {
        super(id);
        this.openTime = openTime;
        this.closeTime = closeTime;
    }

    /**
     * Checks if the provided time falls within opening/closing hours.
     */

    isAvailable(time) {
        return time >= this.openTime && time <= this.closeTime;
    }
}

// second subclass with the driver - shifts and break status
export class DriverSchedule extends ScheduleModel {
    constructor(id, shiftStart, shiftEnd) {
        super(id);
        // Validation: Ensure shift start is before shift end
        if (shiftStart > shiftEnd) {
            throw new Error("Shift start cannot be later than shift end");
        }
        this.shiftStart = shiftStart;
        this.shiftEnd = shiftEnd;
        this.onBreak = false;
    }

    /**
     * Checks availability based on shift hours and break status.
     */

    isAvailable(time) {
        if (this.onBreak) return false;
        return time >= this.shiftStart && time <= this.shiftEnd;
    }
}

// third subclass with the deliveryslot - specific timing
export class DeliverySlot extends ScheduleModel {
    constructor(id) {
        super(id);
        this.isBooked = false;
    }

    /**
     * Checks if the slot is currently free.
     */

    isAvailable() {
        return !this.isBooked;
    }
}