import Alert from "../core/models/Alert.js";
import OrderAlert from "../core/models/alert/OrderAlert.js";
import SystemAlert from "../core/models/alert/SystemAlert.js";
import DriverAlert from "../core/models/alert/DriverAlert.js";
describe("Alert Hierarchy", () => {
    it("Base Alert returns false for display()", () => {
        const base = new Alert("Test");
        expect(base.display()).to.be.false;
    });

    it("OrderAlert displays correct message", () => {
        const alert = new OrderAlert("New order received!");
        expect(alert.display()).to.equal("🛒 Order Alert: New order received!");
    });

    it("SystemAlert displays correct message", () => {
        const alert = new SystemAlert("Server is down!");
        expect(alert.display()).to.equal("💻 System Alert: Server is down!");
    });

    it("DriverAlert displays correct message", () => {
        const alert = new DriverAlert("Pickup delayed!");
        expect(alert.display()).to.equal("🚚 Driver Alert: Pickup delayed!");
    });
});