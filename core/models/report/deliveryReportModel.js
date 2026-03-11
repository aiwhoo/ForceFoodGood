import ReportModel from "./reportModel.js";

class DeliveryReportModel extends ReportModel {
    constructor(params) {
        super(params); // { data, dateRange, options }
    }

    compute() {
        let totalTime = 0;
        let validCount = 0;
        let lateCount = 0;

        for (const delivery of this.data) {
            if (!delivery || typeof delivery.actualMinutes !== "number") {
                continue; // ignore malformed deliveries
            }

            const actual = delivery.actualMinutes;
            const expected = delivery.expectedMinutes;

            totalTime += actual;
            validCount += 1;

            if (typeof expected === "number" && actual > expected) {
                lateCount += 1;
            }
        }

        const averageDeliveryTime = validCount > 0
            ? totalTime / validCount
            : 0;

        return {
            averageDeliveryTime,
            lateCount
        };
    }

}

export default DeliveryReportModel;
