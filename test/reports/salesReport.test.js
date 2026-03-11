import { expect } from "chai";
import SalesReportModel from "../../core/models/report/salesReportModel.js";
import OrderModel from "../../core/models/orderModel.js";


describe("SalesReport", () => {
    it("computes total revenue and average order value", () => {
        // --- Create test orders ---
        const order1 = new OrderModel("alice", "123 Main St", "Pizza Place", "1");
        order1.addMenuItem({ name: "Pizza", price: 12 });
        order1.addMenuItem({ name: "Soda", price: 3 });

        const order2 = new OrderModel("bob", "456 Oak St", "Burger Joint", "2");
        order2.addMenuItem({ name: "Burger", price: 10 });
        order2.addMenuItem({ name: "Fries", price: 4 });

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
});
