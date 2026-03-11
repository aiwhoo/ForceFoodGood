import ReportModel from "./reportModel.js";

class RatingReportModel extends ReportModel {
    constructor(params) {
        super(params); // { data, dateRange, options }
    }

    compute() {
        // Expecting this.data to be an array of RatingModel instances
        // { stars: number, username: string, date: Date/string, review: string }

        let total = 0;
        let count = 0;

        // Histogram for 1–5 stars
        const distribution = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0
        };

        for (const rating of this.data) {
            const stars = rating.stars;

            if (typeof stars === "number" && stars >= 1 && stars <= 5) {
                total += stars;
                count += 1;
                distribution[stars] += 1;
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
