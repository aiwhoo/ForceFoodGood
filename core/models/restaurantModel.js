class RestaurantModel {
    constructor(name, address) {
        this.name = name;
        this.address = address;
        this.reviews = [];
        this.menu = []; // store menu items
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
    calculateAverageReviewRating(){
        let sumOfReviews = 0;
        for(let i = 0; i < this.reviews.length; i++){
            sumOfReviews += this.reviews[i].stars
        }
        if(this.reviews.length == 0){
            return "No Reviews Found";
        }
        return sumOfReviews / this.reviews.length;
    }
    addReview(review){
        this.reviews.push(review);
    }
    //Andy's work, addMenuItem method
    addMenuItem(menuItem){
        this.menu.push(menuItem);
    }
}