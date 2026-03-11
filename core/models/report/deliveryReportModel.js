import ReportModel from "./reportModel.js";

class DeliveryReportModel extends ReportModel {
    constructor(params) {
        super(params); // { data, dateRange, options }
    }

    compute() {
        let totalTime = 0;
        let count = this.data.length;
        let lateCount = 0;

        for (const delivery of this.data) {
            const expected = delivery.expectedMinutes;
            const actual = delivery.actualMinutes;

            // Add to total time
            if (typeof actual === "number") {
                totalTime += actual;
            }

            // Late delivery check
            if (typeof expected === "number" &&
                typeof actual === "number" &&
                actual > expected) {
                lateCount += 1;
            }
        }

        const averageDeliveryTime = count > 0
            ? totalTime / count
            : 0;

        return {
            averageDeliveryTime,
            lateCount
        };
    }
}

export default DeliveryReportModel;
