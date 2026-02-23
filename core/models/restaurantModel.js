/*
    RestaurantModel Class

    This class represents a restaurant. It stores basic information like
    the restaurant’s name and address, along with its reviews and menu items.

    Each restaurant has:
    - A name
    - An address
    - A list of reviews
    - A list of menu items
*/

class RestaurantModel {

    // Constructor sets up a new restaurant with a name and address
    constructor(name, address) {
        this.name = name;
        this.address = address;
        this.reviews = [];  // Stores review objects (each review should have a "stars" property)
        this.menu = [];     // Stores menu items
    }

    // Returns the restaurant's name
    getName() {
        return this.name;
    }

    // Returns the restaurant's address
    getAddress() {
        return this.address;
    }

    // Updates the restaurant's address
    setAddress(address) {
        this.address = address;
    }

    // Updates the restaurant's name
    setName(name) {
        this.name = name;
    }

    /*
        Calculates the average star rating of all reviews.

        - Loops through each review
        - Adds up the number of stars
        - Divides by the total number of reviews

        If there are no reviews, it returns "No Reviews Found".
    */
    calculateAverageReviewRating() {
        let sumOfReviews = 0;

        for (let i = 0; i < this.reviews.length; i++) {
            sumOfReviews += this.reviews[i].stars;
        }

        if (this.reviews.length === 0) {
            return "No Reviews Found";
        }

        return sumOfReviews / this.reviews.length;
    }

    // Adds a new review to the restaurant
    addReview(review) {
        this.reviews.push(review);
    }

    // Adds a new menu item to the restaurant's menu
    addMenuItem(menuItem) {
        this.menu.push(menuItem);
    }
}