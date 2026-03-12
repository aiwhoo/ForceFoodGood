import SalesReportModel from "../../core/models/report/salesReportModel.js";
import RatingReportModel from "../../core/models/report/ratingReportModel.js";
import DeliveryReportModel from "../../core/models/report/deliveryReportModel.js";

import OrderModel from "../../core/models/orderModel.js";
import RatingModel from "../../core/models/ratingsModel.js";
import DeliveryModel from "../../core/models/deliveryModel.js";

// formats each variable in the json
function formatReport(result) {
    let output = "";

    for (const [key, value] of Object.entries(result)) {
        const label = key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, c => c.toUpperCase());

        // --- Special formatting for distribution ---
        if (key.toLowerCase() === "distribution") {
            output += `${label}:\n`;
            for (const [stars, count] of Object.entries(value)) {
                const plural = stars === "1" ? "star" : "stars";
                output += `  ${stars} ${plural}: ${count}\n`;
            }
            continue;
        }

        // --- Currency formatting for money fields ---
        let formattedValue = value;
        if (key.toLowerCase().includes("revenue") ||
            key.toLowerCase().includes("value")) {
            formattedValue = `$${Number(value).toFixed(2)}`;
        }

        output += `${label}: ${formattedValue}\n`;
    }

    return output.trim();
}


document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".report-btn");
    const sections = document.querySelectorAll(".report-section");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-target");

            sections.forEach(sec => sec.classList.add("d-none"));
            document.getElementById(target).classList.remove("d-none");
        });
    });

    // ------------------------------------------------------------
    // SAMPLE DATA + LIVE REPORT GENERATION
    // ------------------------------------------------------------

    // --- Sales Report Sample ---
    const order1 = new OrderModel("Alice", "123 Main", "Pizza Place", "1");
    order1.addMenuItem({ name: "Pizza", price: 12 });
    order1.addMenuItem({ name: "Soda", price: 3 });

    const order2 = new OrderModel("Bob", "456 Oak", "Burger Joint", "2");
    order2.addMenuItem({ name: "Burger", price: 10 });
    order2.addMenuItem({ name: "Fries", price: 4 });

    const salesReport = new SalesReportModel({
        data: [order1, order2],
        dateRange: { start: "2024-01-01", end: "2024-12-31" },
        options: {}
    });

    const salesData = salesReport.generate();
    document.getElementById("sales-output").textContent =
        formatReport(salesData.result);


    // --- Rating Report Sample ---
    const r1 = new RatingModel(5, "Alice", "2024-01-01", "Great!");
    const r2 = new RatingModel(3, "Bob", "2024-01-02", "Okay");
    const r3 = new RatingModel(4, "Charlie", "2024-01-03", "Good");

    const ratingReport = new RatingReportModel({
        data: [r1, r2, r3],
        dateRange: { start: "2024-01-01", end: "2024-12-31" },
        options: {}
    });

    const ratingData = ratingReport.generate();
    document.getElementById("rating-output").textContent =
        formatReport(ratingData.result);

    // --- Delivery Report Sample ---
    const d1 = new DeliveryModel({
        expectedMinutes: 20,
        actualMinutes: 25,
        driver: "Alice",
        date: "2024-01-01"
    });

    const d2 = new DeliveryModel({
        expectedMinutes: 30,
        actualMinutes: 28,
        driver: "Bob",
        date: "2024-01-02"
    });

    const deliveryReport = new DeliveryReportModel({
        data: [d1, d2],
        dateRange: { start: "2024-01-01", end: "2024-12-31" },
        options: {}
    });

    const deliveryData = deliveryReport.generate();
    document.getElementById("delivery-output").textContent =
        formatReport(deliveryData.result);
});
