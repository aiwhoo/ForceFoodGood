class SalesReportModel extends ReportModel {
    constructor(params) {
        super(params); // { data, dateRange, options }
    }
    compute() {
        let totalRevenue = 0;
        let orderCount = this.data.length;

        for (const order of this.data) {
            // Use the model's getter to be safe
            const amount = typeof order.getCost === "function"
                ? order.getCost()
                : order.totalCost ?? 0;

            totalRevenue += amount;
        }

        const averageOrderValue = orderCount > 0
            ? totalRevenue / orderCount
            : 0;

        return {
            totalRevenue,
            averageOrderValue
        };
    }

}