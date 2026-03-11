export class ScheduleModel {
    constructor(id) {
        this.id = id;
    }
    isAvailable(param) {
        console.log("Checking for the general availability...");
        return false;
    }
}

//first subclass with the restaurant
export class RestaurantSchedule extends ScheduleModel {
    constructor(id, openTime, closeTime) {
        super(id);
        this.openTime = openTime;
        this.closeTime = closeTime;
    }
    isAvailable(time) {
        return time >= this.openTime && time <= this.closeTime;
    }
}

// second subclass with the driver
export class DriverSchedule extends ScheduleModel {
    constructor(id, shiftStart, shiftEnd) {
        super(id);
        this.shiftStart = shiftStart;
        this.shiftEnd = shiftEnd;
        this.onBreak = false;
    }
    isAvailable(time) {
        if (this.onBreak) return false;
        return time >= this.shiftStart && time <= this.shiftEnd;
    }
}

// third subclass with the deliveryslot
export class DeliverySlot extends ScheduleModel {
    constructor(id) {
        super(id);
        this.isBooked = false;
    }
    isAvailable() {
        return !this.isBooked;
    }
}