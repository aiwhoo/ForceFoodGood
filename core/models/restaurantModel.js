class RestaurantModel {
    constructor(name, address, operatingHours = "Unspecified") {
        this.name = name;
        this.address = address;
        this.reviews = [];
        this.rating = 0; // new property to store average rating
        this.operatingHours = operatingHours; //knows when restaurant is open
    }

    getName() {
        return this.name;
    }

    getAddress() {
        return this.address;
    }

    getOperatingHours(){
        return this.operatingHours;
    }
    setAddress(address) {
        this.address = address;
    }

    setName(name) {
        this.name = name;
    }

    setOperatingHours(hours) {
        this.operatingHours = hours;
    }
    calculateAverageReviewRating(){
        let sumOfReviews = 0;

        for (let i = 0; i < this.reviews.length; i++) {
            sumOfReviews += this.reviews[i].stars;
        }

        if (this.reviews.length == 0) {
            return "No Reviews Found";
        }

        return sumOfReviews / this.reviews.length;
    }

    addReview(review) {
        this.reviews.push(review);
    }

    updateRating() {
        const average = this.calculateAverageReviewRating();

        if (average === "No Reviews Found") {
            this.rating = 0;
        } else {
            this.rating = average;
        }

        return this.rating;
    }
    // Edit an existing review
    editReview(index, updatedReview) {
        if (index < 0 || index >= this.reviews.length) {
            throw new Error("Invalid review index");
        }

        if (!(updatedReview instanceof RatingModel)) {
            throw new Error("Updated Review must be a RatingModel instance");
        }

        this.reviews[index] = updatedReview;
    }

}