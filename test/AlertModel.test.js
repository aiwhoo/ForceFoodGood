import { expect } from 'chai';
import { AlertModel, OrderAlert, SystemAlert, DriverAlert }
    from '../core/models/AlertModel.js'

describe("AlertModel Polymorphism Tests", function () {

    /*
    Test 1: Base Class Behavior
    Why this test exists:
        Ensures the parent AlertModel correctly stores core data (message).
    What it validates:
        The constructor properly assigns the alert message.
    Why it is important to system stability:
        All subclasses inherit from AlertModel; if base class fails,
        every alert type will be broken.
    */
    it("stores alert message in AlertModel", function () {
        let alert = new AlertModel("Test alert");
        expect(alert.message).to.equal("Test alert");
    });

    /*
    Test 2: Subclass Behavior
    Why this test exists:
        OrderAlert introduces specialized behavior for order notifications.
    What it validates:
        The sendEmail() method works and returns a correctly formatted string.
    Why it is important to system stability:
        Ensures users reliably receive order notifications.
    */
    it("OrderAlert sends email notification", function () {
        let orderAlert = new OrderAlert("Order shipped", 101);
        let result = orderAlert.sendEmail();
        expect(result).to.include("Email");
    });

    /*
    Test 3: Subclass Override / Polymorphism
    Why this test exists:
        SystemAlert overrides logAlert() to customize system alerts.
    What it validates:
        The overridden logAlert() runs instead of the base method.
    Why it is important to system stability:
        Differentiates system alerts from regular alerts, avoiding miscommunication.
    */
    it("SystemAlert overrides logAlert behavior", function () {
        let systemAlert = new SystemAlert("Maintenance tonight");
        let result = systemAlert.logAlert();
        expect(result).to.include("SYSTEM");
    });

    /*
    Test 4: Failure / Edge Case
    Why this test exists:
        DriverAlert requires a driverId; testing missing driverId checks robustness.
    What it validates:
        The class handles undefined driverId without crashing.
        markAcknowledged() still updates the state correctly.
    Why it is important to system stability:
        Prevents runtime errors in production if driver data is missing
        and ensures alerts can still be acknowledged.
    */
    it("DriverAlert handles missing driverId", function () {
        let driverAlert = new DriverAlert("Pickup order");
        expect(driverAlert.driverId).to.equal(undefined);

        driverAlert.markAcknowledged();
        expect(driverAlert.acknowledged).to.equal(true);
    });

});