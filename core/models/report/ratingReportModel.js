import ReportModel from "./reportModel.js";

class RatingReportModel extends ReportModel {
    constructor(params) {
        super(params); // { data, dateRange, options }
    }

    compute() {
        // Expecting this.data to be an array of rating objects:
        // { rating: number, ... }

        let total = 0;
        let count = 0;

        // Initialize histogram
        const distribution = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        };

        for (const entry of this.data) {
            const rating = entry.rating ?? entry.stars ?? null;

            if (typeof rating === "number" && rating >= 1 && rating <= 5) {
                total += rating;
                count += 1;
                distribution[rating] += 1;
            }
        }

        const averageRating = count > 0 ? total / count : 0;

        return {
            averageRating,
            ratingCount: count,
            distribution
        };
    }
}

export default RatingReportModel;