import RatingModel from "./ratingsModel.js";

class RestaurantRatingModel extends RatingModel {

    constructor(stars, username, date, restaurantId, restaurantWaitTimes, review = "") {
        super(stars, username, date, review);
        this.restaurantId = restaurantId;
        this.restaurantWaitTimes = restaurantWaitTimes;
    }


    averageWaitTime() {

        // Ensure restaurantWaitTimes is a valid array
        if (!Array.isArray(this.restaurantWaitTimes) || this.restaurantWaitTimes.length === 0) {
            return 0;
        }

        const total = this.restaurantWaitTimes.reduce((sum, rating) => {
            return sum + rating.stars;
        }, 0);

        return total / this.restaurantWaitTimes.length;
    }

}

export default RestaurantRatingModel;