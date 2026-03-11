import { expect } from "chai";
import DeliveryReportModel from "../../core/models/report/deliveryReportModel.js";
import DeliveryModel from "../../core/models/deliveryModel.js";

describe("DeliveryReport", () => {
    it("calls validate(), preprocess(), compute(), and serialize() in generate()", () => {
        const delivery = new DeliveryModel({
            expectedMinutes: 20,
            actualMinutes: 25,
            driver: "anish",
            date: "2024-01-01"
        });

        const report = new DeliveryReportModel({
            data: [delivery],
            dateRange: { start: "2024-01-01", end: "2024-12-31" },
            options: {}
        });

        let validateCalled = false;
        let preprocessCalled = false;
        let computeCalled = false;
        let serializeCalled = false;

        report.validate = () => { validateCalled = true; };
        report.preprocess = () => { preprocessCalled = true; };
        report.compute = () => { computeCalled = true; return {}; };
        report.serialize = () => { serializeCalled = true; return {}; };

        report.generate();

        expect(validateCalled).to.equal(true);
        expect(preprocessCalled).to.equal(true);
        expect(computeCalled).to.equal(true);
        expect(serializeCalled).to.equal(true);
    });

    it("correctly computes average delivery time and late delivery count", () => {
        const d1 = new DeliveryModel({
            expectedMinutes: 20,
            actualMinutes: 25,
            driver: "anish",
            date: "2024-01-01"
        });

        const d2 = new DeliveryModel({
            expectedMinutes: 30,
            actualMinutes: 28,
            driver: "kai",
            date: "2024-01-02"
        });

        const report = new DeliveryReportModel({
            data: [d1, d2],
            dateRange: { start: "2024-01-01", end: "2024-12-31" },
            options: {}
        });

        const output = report.generate();

        expect(output.result.averageDeliveryTime).to.equal((25 + 28) / 2);
        expect(output.result.lateCount).to.equal(1); // only d1 is late
    });

    it("returns zeros when no deliveries exist", () => {
        const report = new DeliveryReportModel({
            data: [],
            dateRange: { start: "2024-01-01", end: "2024-12-31" },
            options: {}
        });

        const output = report.generate();

        expect(output.result.averageDeliveryTime).to.equal(0);
        expect(output.result.lateCount).to.equal(0);
    });

    it("safely ignores malformed delivery objects", () => {
        const badDelivery = { actualMinutes: "not-a-number" };

        const goodDelivery = new DeliveryModel({
            expectedMinutes: 20,
            actualMinutes: 25,
            driver: "anish",
            date: "2024-01-01"
        });

        const report = new DeliveryReportModel({
            data: [badDelivery, goodDelivery],
            dateRange: { start: "2024-01-01", end: "2024-12-31" },
            options: {}
        });

        const output = report.generate();

        expect(output.result.averageDeliveryTime).to.equal(25);
        expect(output.result.lateCount).to.equal(1);
    });

    it("throws an error when dateRange is missing", () => {
        const delivery = new DeliveryModel({
            expectedMinutes: 20,
            actualMinutes: 25,
            driver: "anish",
            date: "2024-01-01"
        });

        expect(() => {
            new DeliveryReportModel({
                data: [delivery],
                dateRange: null,
                options: {}
            }).generate();
        }).to.throw();
    });
});
