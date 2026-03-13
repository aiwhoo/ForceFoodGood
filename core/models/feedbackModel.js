export class Feedback {
    constructor(userName, rating, comment) {
        if (rating < 1 || rating > 5) {
            throw new Error("Rating must be between 1 and 5");
        }
        this.userName = userName;
        this.rating = rating;
        this.comment = comment;
    }

    getFormattedFeedback() {
        return `${this.userName}: ${this.rating} stars`;
    }
}

export class RestaurantFeedback extends Feedback {
    constructor(userName, rating, comment, restaurantName) {
        super(userName, rating, comment);
        this.restaurantName = restaurantName;
    }
    getFormattedFeedback() {
        return `[Restaurant: ${this.restaurantName}] ${this.userName}: ${this.comment} (${this.rating}/5)`;
    }
}

export class DriverFeedback extends Feedback {
    constructor(userName, rating, comment, driverName) {
        super(userName, rating, comment);
        this.driverName = driverName; // Defined here...
    }
    getFormattedFeedback() {
        // ...and now used here!
        return `[Driver: ${this.driverName}] ${this.userName} rated: ${this.rating}/5 stars`;
    }
}

export class MenuItemFeedback extends Feedback {
    constructor(userName, rating, comment, itemName) {
        super(userName, rating, comment);
        this.itemName = itemName;
    }
    getFormattedFeedback() {
        return `[Food: ${this.itemName}] ${this.userName}: ${this.comment}`;
    }
}