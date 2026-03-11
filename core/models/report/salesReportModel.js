import ReportModel from "./reportModel.js";

class SalesReportModel extends ReportModel {
    constructor(params) {
        super(params); // { data, dateRange, options }
    }

    compute() {
        // Compute total revenue and average order value
        let totalRevenue = 0;
        let validCount = 0;

        for (const order of this.data) {
            // skip over poorly formed OrderModels
            const amount = typeof order.getCost === "function"
                ? order.getCost()
                : (typeof order.totalCost === "number" ? order.totalCost : null);

            if (typeof amount === "number") {
                totalRevenue += amount;
                validCount += 1;
            }
        }

        const averageOrderValue = validCount > 0
            ? totalRevenue / validCount
            : 0;

        return {
            totalRevenue,
            averageOrderValue
        };
    }
}

export default SalesReportModel