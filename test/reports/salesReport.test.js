import { expect } from "chai";
import SalesReportModel from "../../core/models/report/salesReportModel.js";
import OrderModel from "../../core/models/orderModel.js";


describe("SalesReport", () => {
    it("calls validate(), preprocess(), compute(), and serialize() in generate() function", () => {
        // this test ensures that all processing functions are called in the report
        const order = new OrderModel("anish", "address1", "five guy", "1");
        order.addMenuItem({name: "chili", price: 940.99})

        const report = new SalesReportModel({
            data: [order],
            dateRange: { start: "2024-01-01", end: "2024-12-31" },
            options: {}
        })

        let validateCalled = false;
        let preprocessCalled = false;
        let computeCalled = false;
        let serializeCalled = false;

        // overwrite methods to ensure that they are called
        report.validate = () => { validateCalled = true; };
        report.preprocess = () => { preprocessCalled = true; };
        report.compute = () => { computeCalled = true; return {}; };
        report.serialize = () => { serializeCalled = true; return {}; };

        report.generate();

        expect(validateCalled).to.equal(true);
        expect(preprocessCalled).to.equal(true);
        expect(computeCalled).to.equal(true);
        expect(serializeCalled).to.equal(true);
    })
    it("correctly computes total revenue and average order value", () => {
        // --- Create test orders ---
        const order1 = new OrderModel("anish", "address1", "five guy", "1");
        order1.addMenuItem({ name: "chili", price: 12 });
        order1.addMenuItem({ name: "banana", price: 3 });

        const order2 = new OrderModel("kai", "address2", "six guy", "2");
        order2.addMenuItem({ name: "orange peel", price: 10 });
        order2.addMenuItem({ name: "fish", price: 4 });

        // --- Create report ---
        const report = new SalesReportModel({
            data: [order1, order2],
            dateRange: { start: "2024-01-01", end: "2024-12-31" },
            options: {}
        });

        const output = report.generate();

        // --- Assertions ---
        expect(output.result.totalRevenue).to.equal(29); // 15 + 14
        expect(output.result.averageOrderValue).to.equal(14.5); // 29 / 2
    });
    it("returns zeros when no orders exist", () => {
        // edge case for when there are no orders, which can happen and thus we would want to return 0
        const report = new SalesReportModel({
            data: [],
            dateRange: { start: "2024-01-01", end: "2024-12-31" },
            options: {}
        });

        const output = report.generate();

        expect(output.result.totalRevenue).to.equal(0);
        expect(output.result.averageOrderValue).to.equal(0);
    });
    it("safely ignores orders with NaN totalCost", () => {
        // if for some reason, an order cost isn't a number, our computations should ignore them
        const badOrder = { totalCost: "not-a-number" };

        const goodOrder = new OrderModel("anish", "address1", "five guy", "1");
        goodOrder.addMenuItem({ name: "Pizza", price: 10 });

        const report = new SalesReportModel({
            data: [badOrder, goodOrder],
            dateRange: { start: "2024-01-01", end: "2024-12-31" },
            options: {}
        });

        const output = report.generate();

        expect(output.result.totalRevenue).to.equal(10);
        expect(output.result.averageOrderValue).to.equal(10);
    });
    it("safely ignores non-order objects", () => {
        // if for some reason, an order cost isn't a number, our computations should ignore them
        const badOrder = null;

        const goodOrder = new OrderModel("anish", "address1", "five guy", "1");
        goodOrder.addMenuItem({ name: "Pizza", price: 10 });

        const report = new SalesReportModel({
            data: [badOrder, goodOrder],
            dateRange: { start: "2024-01-01", end: "2024-12-31" },
            options: {}
        });

        const output = report.generate();

        expect(output.result.totalRevenue).to.equal(10);
        expect(output.result.averageOrderValue).to.equal(10);
    });
    it("throws an error when dateRange is missing", () => {
        // test failure condition ensuring that there is always a date range for the report filter
        const order = new OrderModel("alice", "123 Main St", "Pizza Place", "1");
        order.addMenuItem({ name: "Pizza", price: 10 });

        expect(() => {
            new SalesReportModel({
                data: [order],
                dateRange: null,
                options: {}
            }).generate();
        }).to.throw();
    });
});
