import RatingModel from "./ratingsModel.js";

class DeliveryDriverRatingModel extends RatingModel {

    constructor(stars, username, date, review = "", driverId) {
        super(stars, username, date, review);
        this.driverId = driverId;
    }

    updateDriverScore(ratings, newScore) {
        ratings.push(newScore);
    }

    calculateDriverAverage(ratings) {
        if (!ratings || ratings.length === 0) {
            return 0;
        }

        const total = ratings.reduce((sum, rating) => sum + rating.stars, 0);
        return total / ratings.length;
    }

}

export default DeliveryDriverRatingModel;