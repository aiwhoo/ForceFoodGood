class RestaurantModel {
    constructor(name, address) {
        this.name = name;
        this.address = address;
        this.rating = rating;
        this.reviews = [];
        this.menu = [];
    }

    getName() {
        return this.name;
    }

    getAddress() {
        return this.address;
    }

    setAddress(address) {
        this.address = address;
    }

    setName(name) {
        this.name = name;
    }

    calculateAverageReviewRating() {
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
    removeMenuItem(menuItem) {
        this.menu = this.menu.filter((item) => {
            // should filter out the removed menuItem
            // will not error if removed menuItem is not in the menu
            return item !== menuItem;
        })
    }

    // Prevent duplicate menu item names (case-insensitive).
    addMenuItem(menuItem) {
        if (!menuItem || !menuItem.name) {
            throw new Error("Invalid MenuItem.");
        }

        const duplicateExists = this.menu.some(
            item => item.name.toLowerCase() === menuItem.name.toLowerCase()
        );

        if (duplicateExists) {
            throw new Error("This menu item already exists in the restaurant.");
        }

        this.menu.push(menuItem);
    }

    getMenu() {
        return this.menu;
    }
}

// Backward-compatible alias for existing references/tests.
const RestaurantModel = Restaurant;
