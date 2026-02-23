class RestaurantModel {
    constructor(name, address) {
        this.name = name;
        this.address = address;
        this.reviews = [];
    }

    // Getters
    getName() {
        return this.name;
    }

    getAddress() {
        return this.address;
    }

    // Setters
    setName(name) {
        this.name = name;
    }

    setAddress(address) {
        this.address = address;
    }

    // Calculate average rating
    calculateAverageReviewRating() {
        if (this.reviews.length === 0) {
            return "No Reviews Found";
        }

        let sumOfReviews = 0;
        for (let i = 0; i < this.reviews.length; i++) {
            sumOfReviews += this.reviews[i].stars;
        }

        return sumOfReviews / this.reviews.length;
    }

    // Add a review
    addReview(review) {
        this.reviews.push(review);
    }

    // Edit an existing review
    editReview(index, updatedReview) {
        if (index < 0 || index >= this.reviews.length) {
            throw new Error("Invalid review index");
        }

        if (!(updatedReview instanceof RatingModel)) {
            throw new Error("Updated review must be a RatingModel instance");
        }

        this.reviews[index] = updatedReview;
    }
}