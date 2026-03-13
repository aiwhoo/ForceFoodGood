class RatingModel {

    constructor(stars, username, date, review = "") {
        this.stars = stars;
        this.username = username;
        this.date = date;
        this.review = review;

        this.validate();
    }

    validate() {
        if (this.stars < 0 || this.stars > 5) {
            throw new Error("Stars must be between 0 and 5");
        }

        if (!this.username) {
            throw new Error("Username is required");
        }

        if (!this.date) {
            throw new Error("Date is required");
        }
    }

}

export default RatingModel;