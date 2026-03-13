// Parent Class
class AlertModel {
    constructor(message) {
        this.message = message;
        this.timestamp = new Date();
    }

    logAlert() {
        console.log(`[${this.timestamp}] ${this.message}`);
    }
}

// Subclass: OrderAlert
class OrderAlert extends AlertModel {
    constructor(message, orderId) {
        super(message);
        this.orderId = orderId;
    }

    sendEmail() {
        return `Email sent for Order ${this.orderId}: ${this.message}`;
    }

    sendPush() {
        return `Push notification sent for Order ${this.orderId}: ${this.message}`;
    }
}

// Subclass: SystemAlert
class SystemAlert extends AlertModel {
    constructor(message) {
        super(message);
    }

    broadcast() {
        return `Broadcasting system alert: ${this.message}`;
    }

    logAlert() {
        return `[SYSTEM ALERT] ${this.message}`;
    }
}

// Subclass: DriverAlert
class DriverAlert extends AlertModel {
    constructor(message, driverId) {
        super(message);
        this.driverId = driverId;
        this.acknowledged = false;
    }

    sendSMS() {
        return `SMS sent to Driver ${this.driverId}: ${this.message}`;
    }

    markAcknowledged() {
        this.acknowledged = true;
        return `Driver ${this.driverId} acknowledged the alert.`;
    }
}

export { AlertModel, OrderAlert, SystemAlert, DriverAlert }
